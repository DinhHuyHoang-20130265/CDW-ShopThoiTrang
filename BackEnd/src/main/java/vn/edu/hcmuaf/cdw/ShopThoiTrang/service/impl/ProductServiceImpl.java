package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.ProductService;

import javax.swing.text.html.HTMLDocument;
import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ImageProductRepository imageProductRepository;

    @Autowired
    private PriceRepository priceRepository;

    @Autowired
    private VariationRepository variationRepository;

    @Autowired
    private SizeRepository sizeRepository;

    @Autowired
    private EntityManager entityManager;


    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
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
            if (filterJson.has("name")) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("name"), "%" + filterJson.get("name").asText() + "%"));
            }
            if (filterJson.has("price")) {
                Join<Product, Price> priceJoin = root.join("price");
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("price"), filterJson.get("price").asDouble()));
            }
            if (filterJson.has("status")) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("status"), filterJson.get("status").asBoolean()));
            }
            if (filterJson.has("categoryId")) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("category").get("id"), filterJson.get("categoryId").asLong()));
            }
            return predicate;
        };

        if (sortBy.equals("price")) {
            return productRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, "price")));
        }
        if (sortBy.equals("name")) {
            return productRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, "name")));
        }
        if (sortBy.equals("status")) {
            return productRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, "status")));
        }

        return productRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, sortBy)));

    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    @Transactional
    public Product saveProduct(Product product) {
        Date currentDate = new Date(System.currentTimeMillis());

        // save price
        Price price = product.getPrice();
        price.setProduct(product);
        priceRepository.save(price);


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
        product.setReleaseBy(product.getReleaseBy());
        product.setUpdateBy(product.getUpdateBy());
        product.setVariations(viariations);

        if (product.getImgProducts() == null) {
            product.setImgProducts(new ArrayList<>());
        }

        List<ImageProduct> imageProducts = new ArrayList<>();
        for (ImageProduct imageProduct : product.getImgProducts()) {
            imageProduct.setUrl(imageProduct.getUrl());
            imageProduct.setReleaseDate(currentDate);
            imageProduct.setUpdateDate(currentDate);
            imageProduct.setReleaseBy(imageProduct.getReleaseBy());
            imageProduct.setUpdateBy(imageProduct.getUpdateBy());
            imageProduct.setProduct(product);
            imageProductRepository.save(imageProduct);
            imageProducts.add(imageProduct);
        }
        product.setImgProducts(imageProducts);

        return productRepository.save(product);

    }

    @Override
    @Transactional
    public Product updateProduct(long productId, Product productUpdate) {
        Date currentDate = new Date(System.currentTimeMillis());

        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + productId));

        // Cập nhật các trường của sản phẩm dựa trên productUpdate
        existingProduct.setName(productUpdate.getName());
        existingProduct.setDescription(productUpdate.getDescription());
        existingProduct.setContent(productUpdate.getContent());
        existingProduct.setStatus(productUpdate.isStatus());
        existingProduct.setImageUrl(productUpdate.getImageUrl());
        existingProduct.setReleaseDate(productUpdate.getReleaseDate());
        existingProduct.setUpdateDate(productUpdate.getUpdateDate());

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
                variationRepository.save(existingVariation);
            } else {
                // Thêm mới biến thể
                List<Variation> viariations = new ArrayList<>();
                for (Variation variation : productUpdate.getVariations()) {
                    System.out.println("id laf:   " + variation.getId());
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
                productUpdate.setReleaseBy(productUpdate.getReleaseBy());
                productUpdate.setUpdateBy(productUpdate.getUpdateBy());
                productUpdate.setVariations(viariations);
                updatedVariations.add(updatedVariation);
            }
        }
        existingProduct.setVariations(updatedVariations);

        // Xóa các biến thể không còn tồn tại
        List<Long> updatedVariationIds = updatedVariations.stream()
                .map(Variation::getId)
                .toList();
        existingProduct.getVariations().removeIf(v -> !updatedVariationIds.contains(v.getId()));

        return productRepository.save(existingProduct);
    }

    private void updateSizes(Variation existingVariation, List<Size> updatedSizes) {
        System.out.println("updatedSizes: " + updatedSizes);
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
        List<Long> ex = new ArrayList<>(existingVariation.getSizes().stream()
                .map(Size::getId)
                .toList());
        System.out.println("updatedSizeIds: " + updatedSizeIds);
        System.out.println("existingVariation.getSizes(): " + ex);
        existingVariation.getSizes().removeIf(s -> !updatedSizeIds.contains(s.getId()));
        ex.removeIf(s -> !updatedSizeIds.contains(s));
        System.out.println("existingVariation.getSizes() after remove: " + ex);
        variationRepository.save(existingVariation);

    }
}


