package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.JWT.JwtUtils;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.ProductService;

import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ImageProductRepository imageProductRepository;

    @Autowired
    private PriceRepository priceRepository;

    @Autowired
    private VariationRepository variationRepository;

    @Autowired
    private SizeRepository sizeRepository;

    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> getAllProducts(String ids) {
        JsonNode filterJson;
        try {
            filterJson = new ObjectMapper().readTree(java.net.URLDecoder.decode(ids, StandardCharsets.UTF_8));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        if (filterJson.has("ids")) {
            List<Long> idsList = new ArrayList<>();
            for (JsonNode idNode : filterJson.get("ids")) {
                idsList.add(idNode.asLong());
            }
            Iterable<Long> itr = List.of(Stream.of(idsList).flatMap(List::stream).toArray(Long[]::new));
            return productRepository.findAllById(itr);
        }

        return null;
    }

    @Override
    public List<Product> getProductsStatusTrue() {
        return productRepository.findByStatusTrue();
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    @Override
    public Page<Product> getAllProducts(String filter, int page, int perPage, String sortBy, String order) {
        Sort.Direction direction = Sort.Direction.ASC;
        if (order.equalsIgnoreCase("DESC"))
            direction = Sort.Direction.DESC;

        JsonNode filterJson;
        try {
            filterJson = new ObjectMapper().readTree(java.net.URLDecoder.decode(filter, StandardCharsets.UTF_8));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        Specification<Product> specification = (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();
            if (filterJson.has("q")) {

                predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("name"), "%" + filterJson.get("q").asText().toLowerCase() + "%"));
            }
            if (filterJson.has("price_lt") || filterJson.has("price_gt")) {
                double priceLt = filterJson.has("price_lt") ? filterJson.get("price_lt").asDouble() : Double.MAX_VALUE;
                double priceGt = filterJson.has("price_gt") ? filterJson.get("price_gt").asDouble() : 0;
                Join<Product, Price> priceJoin = root.join("price");
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.between(priceJoin.get("price"), priceGt, priceLt));
            }
            if (filterJson.has("status")) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("status"), filterJson.get("status").asBoolean()));
            }
            if (filterJson.has("categoryId")) {
                Join<Product, Category> categoryJoin = root.join("categories");
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(categoryJoin.get("id"), filterJson.get("categoryId").asLong()));
            }
            return predicate;
        };

        return switch (sortBy) {
            case "price" ->
                    productRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, "price")));
            case "name" ->
                    productRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, "name")));
            case "status" ->
                    productRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, "status")));
            default ->
                    productRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, sortBy)));
        };

    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    @Transactional
    public ResponseEntity<?> saveProduct(Product product, HttpServletRequest request) {
        Date currentDate = new Date(System.currentTimeMillis());
        String jwt = jwtUtils.getJwtFromCookies(request);
        if (jwt == null) {
            return ResponseEntity.badRequest().body("Token is null");
        }
        String username = jwtUtils.getUserNameFromJwtToken(jwt);
        // save price
        Price price = product.getPrice();
        price.setProduct(product);
        priceRepository.save(price);

        for (ImageProduct imageProduct : product.getImgProducts()) {
            imageProduct.setReleaseDate(currentDate);
            imageProduct.setUpdateDate(currentDate);
            imageProduct.setReleaseBy(userRepository.findByUsername(username).orElse(null));
            imageProduct.setUpdateBy(userRepository.findByUsername(username).orElse(null));
            imageProduct.setProduct(product);
            imageProductRepository.save(imageProduct);

        }
        // save variations
        List<Variation> viariations = new ArrayList<>();
        for (Variation variation : product.getVariations()) {
            System.out.println("id laf:   " + variation.getId());
            variation.setReleaseDate(currentDate);
            variation.setUpdateDate(currentDate);
            variation.setReleaseBy(variation.getReleaseBy());
            variation.setUpdateBy(variation.getUpdateBy());
            variation.setProduct(product);

            List<Size> sizes = new ArrayList<>();
            for (Size size : variation.getSizes()) {
                size.setStatus(size.isStatus());
                size.setStock(size.getStock());
                size.setUpdateDate(currentDate);
                size.setReleaseDate(currentDate);
                size.setReleaseBy(size.getReleaseBy());
                size.setUpdateBy(size.getUpdateBy());
                size.setVariation(variation);

                sizeRepository.save(size);
                sizes.add(size);
            }
            variation.setSizes(sizes);
            variationRepository.save(variation);
            viariations.add(variation);
        }
        product.setUpdateDate(currentDate);
        product.setReleaseDate(currentDate);
        product.setReleaseBy(userRepository.findByUsername(username).orElse(null));
        product.setUpdateBy(userRepository.findByUsername(username).orElse(null));
        product.setVariations(viariations);

        if (product.getImgProducts() == null) {
            product.setImgProducts(new ArrayList<>());
        }

        List<ImageProduct> imageProducts = new ArrayList<>();
        for (ImageProduct imageProduct : product.getImgProducts()) {
            imageProduct.setUrl(imageProduct.getUrl());
            imageProduct.setReleaseDate(currentDate);
            imageProduct.setUpdateDate(currentDate);
            imageProduct.setReleaseBy(userRepository.findByUsername(username).orElse(null));
            imageProduct.setUpdateBy(userRepository.findByUsername(username).orElse(null));
            imageProduct.setProduct(product);
            imageProductRepository.save(imageProduct);
            imageProducts.add(imageProduct);
        }
        product.setImgProducts(imageProducts);

        return ResponseEntity.ok(productRepository.save(product));

    }

    @Override
    @Transactional
    public ResponseEntity<?> updateProduct(long productId, Product productUpdate, HttpServletRequest request) {
        Date currentDate = new Date(System.currentTimeMillis());

        String jwt = jwtUtils.getJwtFromCookies(request);
        if (jwt == null) {
            return ResponseEntity.badRequest().body("Token is null");
        }
        String username = jwtUtils.getUserNameFromJwtToken(jwt);
        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + productId));

        List<ImageProduct> newImageProducts = new ArrayList<>();

        // Cập nhật hoặc thêm mới các ảnh sản phẩm
        for (ImageProduct newImageProduct : productUpdate.getImgProducts()) {
            ImageProduct existingImageProduct = existingProduct.getImgProducts().stream()
                    .filter(i -> i.getUrl().equals(newImageProduct.getUrl()))
                    .findFirst()
                    .orElse(null);
            if (existingImageProduct != null) {
                newImageProducts.add(existingImageProduct);
            } else {
                ImageProduct imageProduct = new ImageProduct();
                imageProduct.setUrl(newImageProduct.getUrl());
                imageProduct.setReleaseDate(currentDate);
                imageProduct.setUpdateDate(currentDate);
                imageProduct.setReleaseBy(userRepository.findByUsername(username).orElse(null));
                imageProduct.setUpdateBy(userRepository.findByUsername(username).orElse(null));
                imageProduct.setProduct(existingProduct);
                imageProductRepository.save(imageProduct);
                newImageProducts.add(imageProduct);
            }
        }

        // Xóa các ảnh không còn tồn tại
        for (ImageProduct existingImageProduct : existingProduct.getImgProducts()) {
            if (newImageProducts.stream()
                    .noneMatch(i ->
                            i.getUrl().equals(existingImageProduct.getUrl()))) {
                imageProductRepository.delete(existingImageProduct);
            }
        }

        existingProduct.setImgProducts(newImageProducts);

        // Cập nhật các trường của sản phẩm dựa trên productUpdate
        existingProduct.setName(productUpdate.getName());
        existingProduct.setDescription(productUpdate.getDescription());
        existingProduct.setContent(productUpdate.getContent());
        existingProduct.setStatus(productUpdate.isStatus());
        existingProduct.setImageUrl(productUpdate.getImageUrl());
        existingProduct.setReleaseDate(productUpdate.getReleaseDate());
        existingProduct.setUpdateDate(productUpdate.getUpdateDate());

        existingProduct.setCategories(productUpdate.getCategories());

        // Cập nhật hoặc thêm mới các biến thể
        List<Variation> updatedVariations = new ArrayList<>();
        for (Variation updatedVariation : productUpdate.getVariations()) {
            Variation existingVariation = existingProduct.getVariations().stream()
                    .filter(v -> v.getId() == updatedVariation.getId())
                    .findFirst()
                    .orElse(null);
            if (existingVariation != null) {
                // Cập nhật biến thể
                existingVariation.setColor(updatedVariation.getColor());
                existingVariation.setUpdateDate(currentDate);
                existingVariation.setUpdateBy(updatedVariation.getUpdateBy());
                updateSizes(existingVariation, updatedVariation.getSizes());
                updatedVariations.add(existingVariation);
            } else {
                // Thêm mới biến thể
                List<Variation> viariations = new ArrayList<>();
                for (Variation variation : productUpdate.getVariations()) {
                    variation.setReleaseDate(currentDate);
                    variation.setUpdateDate(currentDate);
                    variation.setReleaseBy(variation.getReleaseBy());
                    variation.setUpdateBy(variation.getUpdateBy());
                    variation.setProduct(productUpdate);

                    List<Size> sizes = new ArrayList<>();
                    for (Size size : variation.getSizes()) {
                        size.setStatus(size.isStatus());
                        size.setStock(size.getStock());
                        size.setUpdateDate(currentDate);
                        size.setReleaseDate(currentDate);
                        size.setReleaseBy(size.getReleaseBy());
                        size.setUpdateBy(size.getUpdateBy());
                        size.setVariation(variation);

                        sizeRepository.save(size);
                        sizes.add(size);
                    }
                    variation.setSizes(sizes);
                    variationRepository.save(variation);
                    viariations.add(variation);
                }


                productUpdate.setUpdateDate(currentDate);
                productUpdate.setReleaseDate(currentDate);
                productUpdate.setReleaseBy(userRepository.findByUsername(username).orElse(null));
                productUpdate.setUpdateBy(userRepository.findByUsername(username).orElse(null));
                productUpdate.setVariations(viariations);
                updatedVariations.add(updatedVariation);
            }
        }

        // Xóa các biến thể không còn tồn tại
        List<Long> updatedVariationIds = updatedVariations.stream()
                .map(Variation::getId)
                .toList();

        List<Variation> variationsToDelete = new ArrayList<>();
        for (Variation variation : existingProduct.getVariations()) {
            if (!updatedVariationIds.contains(variation.getId())) {
                variationsToDelete.add(variation); // Thêm biến thể cần xóa vào danh sách
            }
        }


        for (Variation variation : variationsToDelete) {
            existingProduct.getVariations().remove(variation); // Loại bỏ biến thể khỏi danh sách
            variationRepository.delete(variation); // Xóa biến thể khỏi cơ sở dữ liệu
        }

        existingProduct.setVariations(updatedVariations);
        return ResponseEntity.ok(productRepository.save(existingProduct));
    }

    private void updateSizes(Variation existingVariation, List<Size> updatedSizes) {
        Date currentDate = new Date(System.currentTimeMillis());
        for (Size updatedSize : updatedSizes) {
            Size existingSize = existingVariation.getSizes().stream()
                    .filter(s -> s.getId() == updatedSize.getId())
                    .findFirst()
                    .orElse(null);
            if (existingSize != null) {
                // Cập nhật kích thước
                existingSize.setSize(updatedSize.getSize());
                existingSize.setStock(updatedSize.getStock());
                existingSize.setStatus(updatedSize.isStatus());
                existingSize.setUpdateDate(currentDate);
                existingSize.setUpdateBy(updatedSize.getUpdateBy());
            } else {
                // Thêm mới kích thước
                updatedSize.setSize(updatedSize.getSize());
                updatedSize.setStock(updatedSize.getStock());
                updatedSize.setStatus(updatedSize.isStatus());
                updatedSize.setUpdateDate(currentDate);
                updatedSize.setUpdateBy(updatedSize.getUpdateBy());
                updatedSize.setReleaseDate(currentDate);
                updatedSize.setReleaseBy(updatedSize.getReleaseBy());
                updatedSize.setVariation(existingVariation);

                existingVariation.getSizes().add(updatedSize);
            }
        }
        // Xóa các kích thước không còn tồn tại
        List<Long> updatedSizeIds = updatedSizes.stream()
                .map(Size::getId)
                .toList();

        List<Size> sizesToDelete = new ArrayList<>();

        for (Size size : existingVariation.getSizes()) {
            if (!updatedSizeIds.contains(size.getId())) {
                sizesToDelete.add(size); // Thêm vào danh sách các đối tượng cần xóa
            }
        }

        for (Size size : sizesToDelete) {
            existingVariation.getSizes().remove(size); // Loại bỏ khỏi danh sách biến thể
            sizeRepository.delete(size); // Xóa khỏi cơ sở dữ liệu
        }

        variationRepository.save(existingVariation); // Lưu biến thể đã cập nhật
    }
}


