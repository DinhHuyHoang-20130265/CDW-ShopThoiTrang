package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.log4j.Logger;
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
    private static final Logger Log = Logger.getLogger(ProductServiceImpl.class.getName());

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
        try {
            return productRepository.findAll();
        } catch (Exception e) {
            Log.error("Error get all products", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Product> getAllProducts(String ids) {
        try {
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
        } catch (RuntimeException e) {
            Log.error("Error get all products", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Product> getProductsStatusTrueAndDeleteFalse() {
        try {
            return productRepository.findByStatusTrueAndDeletedFalse();
        } catch (Exception e) {
            Log.error("Error get all products status true", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public Product getProductById(Long id) {
        try {
            return productRepository.findById(id).orElse(null);
        } catch (Exception e) {
            Log.error("Error get product by id", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public Page<Product> getAllProducts(String filter, int page, int perPage, String sortBy, String order) {
        try {
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
                if (filterJson.has("deleted")) {
                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("deleted"), filterJson.get("deleted").asBoolean()));
                }
                if (filterJson.has("categoryId")) {
                    Join<Product, Category> categoryJoin = root.join("categories");
                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(categoryJoin.get("id"), filterJson.get("categoryId").asLong()));
                }
                return predicate;
            };

            return switch (sortBy) {
                case "price" ->
                        productRepository.findAll(specification, PageRequest.of(page, perPage == -1 ? Integer.MAX_VALUE : perPage, Sort.by(direction, "price")));
                case "name" ->
                        productRepository.findAll(specification, PageRequest.of(page, perPage == -1 ? Integer.MAX_VALUE : perPage, Sort.by(direction, "name")));
                case "status" ->
                        productRepository.findAll(specification, PageRequest.of(page, perPage == -1 ? Integer.MAX_VALUE : perPage, Sort.by(direction, "status")));
                default ->
                        productRepository.findAll(specification, PageRequest.of(page, perPage == -1 ? Integer.MAX_VALUE : perPage, Sort.by(direction, sortBy)));
            };
        } catch (RuntimeException e) {
            Log.error("Error get all products", e);
            throw new RuntimeException(e);
        }

    }

    @Override
    @Transactional
    public void deleteProduct(Long id, HttpServletRequest request) {
        try {
            String jwt = jwtUtils.getJwtFromCookies(request, "shop2h_admin");
            String username = jwtUtils.getUserNameFromJwtToken(jwt);
            Product product = productRepository.findById(id).orElse(null);
            if (product != null) {
                product.setDeleted(true);
                product.setUpdateDate(new Date(System.currentTimeMillis()));
                product.setUpdateBy(userRepository.findByUsername(username).orElse(null));
                productRepository.save(product);
                Log.info(username + "deleted product: " + product.getName());
            }
        } catch (Exception e) {
            Log.error("Error delete product", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public Product restoreProduct(Long id, HttpServletRequest request) {
        try {
            Product product = productRepository.findById(id).orElse(null);
            String jwt = jwtUtils.getJwtFromCookies(request, "shop2h_admin");
            String username = jwtUtils.getUserNameFromJwtToken(jwt);
            if (product != null) {
                product.setDeleted(false);
                product.setUpdateDate(new Date(System.currentTimeMillis()));
                product.setUpdateBy(userRepository.findByUsername(username).orElse(null));
                Log.info(username + "restored product: " + product.getName());
                return productRepository.save(product);
            }
        } catch (Exception e) {
            Log.error("Error restore product", e);
            throw new RuntimeException(e);
        }
        return null;
    }

    @Override
    @Transactional
    public ResponseEntity<?> saveProduct(Product product, HttpServletRequest request) {
        try {
            Date currentDate = new Date(System.currentTimeMillis());
            String jwt = jwtUtils.getJwtFromCookies(request, "shop2h_admin");
            if (jwt == null) {
                return ResponseEntity.badRequest().body("Token is null");
            }
            String username = jwtUtils.getUserNameFromJwtToken(jwt);
            List<ImageProduct> imageProductsCopy = product.getImgProducts();
            Product productCopy = new Product();

            productCopy.setName(product.getName());
            productCopy.setDescription(product.getDescription());
            productCopy.setContent(product.getContent());
            productCopy.setStatus(product.isStatus());
            productCopy.setImageUrl(product.getImageUrl());
            productCopy.setCategories(product.getCategories());

            productCopy = productRepository.save(productCopy);
            // save price
            Price price = new Price();
            price.setPrice(product.getPrice().getPrice());
            price.setProduct(productCopy);
            productCopy.setPrice(price);
            price = savePrice(price);
            productCopy = productRepository.save(productCopy);

            // save variations
            List<Variation> viariations = new ArrayList<>();
            for (Variation variation : product.getVariations()) {
                variation.setReleaseDate(currentDate);
                variation.setUpdateDate(currentDate);
                variation.setReleaseBy(variation.getReleaseBy());
                variation.setUpdateBy(variation.getUpdateBy());
                variation.setProduct(productCopy);

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
            productCopy.setUpdateDate(currentDate);
            productCopy.setReleaseDate(currentDate);
            productCopy.setReleaseBy(userRepository.findByUsername(username).orElse(null));
            productCopy.setUpdateBy(userRepository.findByUsername(username).orElse(null));
            productCopy.setVariations(viariations);

            if (product.getImgProducts() == null) {
                productCopy.setImgProducts(new ArrayList<>());
            }

            List<ImageProduct> imageProducts = new ArrayList<>();
            for (ImageProduct imageProduct : imageProductsCopy) {
                imageProduct.setUrl(imageProduct.getUrl());
                imageProduct.setReleaseDate(currentDate);
                imageProduct.setUpdateDate(currentDate);
                imageProduct.setReleaseBy(userRepository.findByUsername(username).orElse(null));
                imageProduct.setUpdateBy(userRepository.findByUsername(username).orElse(null));
                imageProduct.setProduct(productCopy);
                imageProductRepository.save(imageProduct);
                imageProducts.add(imageProduct);
            }

            productCopy.setImgProducts(imageProducts);
            Log.info(productCopy.getReleaseBy().getUsername() + "added product: " + productCopy.getName());
            return ResponseEntity.ok(productRepository.save(productCopy));
        } catch (Exception e) {
            Log.error("Error save product", e);
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public Price savePrice(Price price) {
        return priceRepository.save(price);
    }

    @Override
    @Transactional
    public ResponseEntity<?> updateProduct(long productId, Product productUpdate, HttpServletRequest request) {
        try {
            Date currentDate = new Date(System.currentTimeMillis());
            String jwt = jwtUtils.getJwtFromCookies(request, "shop2h_admin");
            if (jwt == null) {
                return ResponseEntity.badRequest().body("Token is null");
            }
            String username = jwtUtils.getUserNameFromJwtToken(jwt);
            Product existingProduct = productRepository.findById(productId)
                    .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + productId));

            List<ImageProduct> newImageProducts = new ArrayList<>();

            // Cập nhật hoặc thêm mới các ảnh sản phẩm
            for (ImageProduct current : productUpdate.getImgProducts()) {
                ImageProduct existingImageProduct = existingProduct.getImgProducts().stream()
                        .filter(i -> i.getUrl().equals(current.getUrl()))
                        .findFirst()
                        .orElse(null);
                if (existingImageProduct == null) {
                    ImageProduct imageProduct = new ImageProduct();
                    imageProduct.setUrl(current.getUrl());
                    imageProduct.setReleaseDate(currentDate);
                    imageProduct.setUpdateDate(currentDate);
                    imageProduct.setReleaseBy(userRepository.findByUsername(username).orElse(null));
                    imageProduct.setUpdateBy(userRepository.findByUsername(username).orElse(null));
                    imageProduct.setProduct(existingProduct);
                    imageProductRepository.save(imageProduct);
                    newImageProducts.add(imageProduct);
                } else {
                    newImageProducts.add(existingImageProduct);
                }
            }
            // Xóa các ảnh không còn tồn tại
            for (ImageProduct existingImageProduct : existingProduct.getImgProducts()) {
                if (!newImageProducts.isEmpty() && newImageProducts.stream()
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
                    existingVariation.setColorCode(updatedVariation.getColorCode());
                    existingVariation.setUpdateDate(currentDate);
                    existingVariation.setUpdateBy(userRepository.findByUsername(username).orElse(null));
                    updateSizes(existingVariation, updatedVariation.getSizes(), username);
                    updatedVariations.add(existingVariation);
                } else {
                    // Thêm mới biến thể
                    List<Variation> viariations = new ArrayList<>();
                    for (Variation variation : productUpdate.getVariations()) {
                        variation.setReleaseDate(currentDate);
                        variation.setUpdateDate(currentDate);
                        variation.setReleaseBy(userRepository.findByUsername(username).orElse(null));
                        variation.setUpdateBy(userRepository.findByUsername(username).orElse(null));
                        variation.setProduct(productUpdate);

                        List<Size> sizes = new ArrayList<>();
                        for (Size size : variation.getSizes()) {
                            size.setStatus(size.isStatus());
                            size.setStock(size.getStock());
                            size.setUpdateDate(currentDate);
                            size.setReleaseDate(currentDate);
                            size.setReleaseBy(userRepository.findByUsername(username).orElse(null));
                            size.setUpdateBy(userRepository.findByUsername(username).orElse(null));
                            Variation savedVariation = variationRepository.save(variation);
                            size.setVariation(savedVariation);

                            sizeRepository.save(size);
                            sizes.add(size);
                        }
                        variation.setSizes(sizes);
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
                    variationsToDelete.add(variation);
                }
            }


            for (Variation variation : variationsToDelete) {
                variation.setUpdateBy(null);
                variation.setReleaseBy(null);
                existingProduct.getVariations().remove(variation);
                variationRepository.delete(variation);
            }
            existingProduct.setVariations(updatedVariations);

            // Cập nhật giá
            Price price = priceRepository.findById(productUpdate.getPrice().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Price not found with id: " + productUpdate.getPrice().getId()));

            price.setProduct(existingProduct);
            price.setPrice(productUpdate.getPrice().getPrice());
            price = priceRepository.save(price);
            existingProduct.setPrice(price);


            Log.info(existingProduct.getReleaseBy().getUsername() + "updated product: " + existingProduct.getName());
            return ResponseEntity.ok(productRepository.save(existingProduct));
        } catch (IllegalArgumentException e) {
            Log.error("Error update product", e);
            throw new RuntimeException(e);
        }
    }

    private void updateSizes(Variation existingVariation, List<Size> updatedSizes, String username) {
        try {
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
                    sizeRepository.save(existingSize);
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
            List<Long> updatedSizeIds = updatedSizes.stream()
                    .map(Size::getId)
                    .toList();

            List<Size> sizesToDelete = new ArrayList<>();

            for (Size size : existingVariation.getSizes()) {
                if (!updatedSizeIds.contains(size.getId())) {
                    sizesToDelete.add(size);
                }
            }

            for (Size size : sizesToDelete) {
                existingVariation.getSizes().remove(size);
                sizeRepository.delete(size);
            }
            Log.info(username + "updated variation: " + existingVariation.getColor());
            variationRepository.save(existingVariation);
        } catch (Exception e) {
            Log.error("Error update sizes", e);
            throw new RuntimeException(e);
        }
    }
}


