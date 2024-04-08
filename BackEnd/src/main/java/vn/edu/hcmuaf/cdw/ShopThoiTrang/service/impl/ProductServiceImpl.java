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
            System.out.println("id laf:   "+variation.getId());
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
    public Product updateProduct(long id, Product updatedProduct) {
        Product existingProduct = productRepository.findById(id).orElse(null);

        Date currentDate = new Date(System.currentTimeMillis());

        // Cập nhật thông tin chung của sản phẩm
        existingProduct.setName(updatedProduct.getName());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setUpdateDate(currentDate);
        existingProduct.setUpdateBy(updatedProduct.getUpdateBy());

        // Cập nhật giá của sản phẩm
        Price price = existingProduct.getPrice();
        price.setPrice(updatedProduct.getPrice().getPrice());
        priceRepository.save(price);

        // Xóa các biến thể không có trong danh sách biến thể của sản phẩm cập nhật
        List<Variation> updatedVariations = updatedProduct.getVariations();
        List<Variation> existingVariations = existingProduct.getVariations();
        existingVariations.removeIf(existingVariation -> !updatedVariations.contains(existingVariation));

        // Thêm mới các biến thể có trong danh sách biến thể của sản phẩm cập nhật nhưng không có trong sản phẩm hiện tại
        for (Variation updatedVariation : updatedVariations) {
            if (!existingVariations.contains(updatedVariation)) {
                Variation newVariation = new Variation();
                newVariation.setColor(updatedVariation.getColor());
                newVariation.setReleaseDate(currentDate);
                newVariation.setUpdateDate(currentDate);
                newVariation.setReleaseBy(updatedVariation.getReleaseBy());
                newVariation.setUpdateBy(updatedVariation.getUpdateBy());
                newVariation.setProduct(existingProduct);

                List<Size> sizes = new ArrayList<>();
                for (Size size : updatedVariation.getSizes()) {
                    Size newSize = new Size();
                    newSize.setSize(size.getSize());
                    newSize.setStatus(size.isStatus());
                    newSize.setStock(size.getStock());
                    newSize.setUpdateDate(currentDate);
                    newSize.setReleaseDate(currentDate);
                    newSize.setReleaseBy(size.getReleaseBy());
                    newSize.setUpdateBy(size.getUpdateBy());
                    newSize.setVariation(newVariation);

                    sizeRepository.save(newSize);
                    sizes.add(newSize);
                }
                newVariation.setSizes(sizes);
                variationRepository.save(newVariation);
                existingVariations.add(newVariation);
            }


        }


        // Cập nhật thông tin biến thể của sản phẩm
        for (Variation updatedVariation : updatedProduct.getVariations()) {
            Variation existingVariation = variationRepository.findById(updatedVariation.getId()).orElse(null);
            existingVariation.setColor(updatedVariation.getColor());
            existingVariation.setUpdateDate(currentDate);
            existingVariation.setUpdateBy(updatedVariation.getUpdateBy());

            // Cập nhật thông tin kích thước của biến thể
            List<Size> updatedSizes = new ArrayList<>();
            for (Size updatedSize : updatedVariation.getSizes()) {
                Size existingSize = sizeRepository.findById(updatedSize.getId()).orElse(null);
                existingSize.setSize(updatedSize.getSize());
                existingSize.setStatus(updatedSize.isStatus());
                existingSize.setStock(updatedSize.getStock());
                existingSize.setUpdateDate(currentDate);
                existingSize.setUpdateBy(updatedSize.getUpdateBy());
                updatedSizes.add(existingSize);
            }
            existingVariation.setSizes(updatedSizes);
            variationRepository.save(existingVariation);
            updatedVariations.add(existingVariation);
        }
        existingProduct.setVariations(updatedVariations);

        // Cập nhật thông tin ảnh sản phẩm
        List<ImageProduct> updatedImageProducts = new ArrayList<>();
        for (ImageProduct updatedImageProduct : updatedProduct.getImgProducts()) {
            ImageProduct existingImageProduct = imageProductRepository.findById(updatedImageProduct.getId()).orElse(null);
            existingImageProduct.setUrl(updatedImageProduct.getUrl());
            existingImageProduct.setUpdateDate(currentDate);
            existingImageProduct.setUpdateBy(updatedImageProduct.getUpdateBy());
            updatedImageProducts.add(existingImageProduct);
        }
        existingProduct.setImgProducts(updatedImageProducts);

        // Lưu các thay đổi vào cơ sở dữ liệu và trả về sản phẩm đã được cập nhật
        return productRepository.save(existingProduct);
    }


}
