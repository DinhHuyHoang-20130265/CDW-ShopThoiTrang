package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Category;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.CategoryRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.CategoryService;

import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;


    @Override
    public Page<Category> getAllCategories(String filter, int start, int end, String sortBy, String order) {
        Sort.Direction direction = Sort.Direction.ASC;
        if (order.equalsIgnoreCase("DESC"))
            direction = Sort.Direction.DESC;

        JsonNode filterJson;
        try {
            filterJson = new ObjectMapper().readTree(java.net.URLDecoder.decode(filter, StandardCharsets.UTF_8));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        Specification<Category> specification = (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();
            if (filterJson.has("name")) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("name"), "%" + filterJson.get("name").asText() + "%"));
            }
            if (filterJson.has("status")) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("status"), filterJson.get("status").asBoolean()));
            }
            return predicate;
        };

        if (sortBy.equals("name")) {
            return categoryRepository.findAll(specification, PageRequest.of(start, end, Sort.by(direction, "name")));
        }
        if (sortBy.equals("status")) {
            return categoryRepository.findAll(specification, PageRequest.of(start, end, Sort.by(direction, "status")));
        }

        return categoryRepository.findAll(specification, PageRequest.of(start, end, Sort.by(direction, sortBy)));
    }

    @Override
    public List<Category> getAllCategories(String ids) {
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
            return categoryRepository.findAllById(itr);
        }

        return null;
    }

    @Override
    public List<Category> getCategoriesStatusTrue() {
        return categoryRepository.getAllByStatusIsTrue();
    }

    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @Override
    public Category saveCategory(Category category) {
        Date currentDate = new Date(System.currentTimeMillis());
        category.setReleaseDate(currentDate);
        category.setUpdateDate(currentDate);
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Long id, Category category) {
        Category categoryUpdate = categoryRepository.findById(id).orElse(null);
        categoryUpdate.setName(category.getName());
        categoryUpdate.setStatus(category.isStatus());
        categoryUpdate.setUpdateDate(new Date(System.currentTimeMillis()));
        return categoryRepository.save(categoryUpdate);
    }
}
