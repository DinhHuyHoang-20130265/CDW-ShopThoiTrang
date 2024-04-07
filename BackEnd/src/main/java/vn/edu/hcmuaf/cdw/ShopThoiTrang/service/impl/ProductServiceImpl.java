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
        Price price = new Price();
        price.setPrice(product.getPrice().getPrice());
        price.setProduct(product);
        priceRepository.save(price);

        // save variations
        List<Variation> viariations = new ArrayList<>();
        for (Variation variation : product.getVariations()) {
            Variation newVariation = new Variation();
            newVariation.setColor(variation.getColor());
            newVariation.setReleaseDate(currentDate);
            newVariation.setUpdateDate(currentDate);
            newVariation.setReleaseBy(variation.getReleaseBy());
            newVariation.setUpdateBy(variation.getUpdateBy());
            newVariation.setProduct(product);

            List<Size> sizes = new ArrayList<>();
            for (Size size : variation.getSizes()) {
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
            viariations.add(newVariation);
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
            ImageProduct newImageProduct = new ImageProduct();
            newImageProduct.setUrl(imageProduct.getUrl());
            newImageProduct.setReleaseDate(currentDate);
            newImageProduct.setUpdateDate(currentDate);
            newImageProduct.setReleaseBy(imageProduct.getReleaseBy());
            newImageProduct.setUpdateBy(imageProduct.getUpdateBy());
            newImageProduct.setProduct(product);
            imageProductRepository.save(newImageProduct);
            imageProducts.add(newImageProduct);
        }
        product.setImgProducts(imageProducts);

        return productRepository.save(product);

//        entityManager.merge(product);
    }

    @Override
    public void updateProduct(long id, Product product) {
        Date currentDate = new Date(System.currentTimeMillis());
        Product existingProduct = entityManager.find(Product.class, id);
        if (existingProduct != null) {

            existingProduct.setName(product.getName());
            existingProduct.setDescription(product.getDescription());
            existingProduct.setContent(product.getContent());
            existingProduct.setStatus(product.isStatus());
            existingProduct.setImageUrl(product.getImageUrl());
            existingProduct.setUpdateDate(currentDate);

            existingProduct.setCategories(product.getCategories());
            existingProduct.setVariations(product.getVariations());
            existingProduct.setImgProducts(product.getImgProducts());
            existingProduct.setPromotions(product.getPromotions());

            entityManager.merge(existingProduct);
        }
    }

}
