package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.criteria.Predicate;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.JWT.JwtUtils;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Category;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.CategoryRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.UserRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.CategoryService;

import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@Service
public class CategoryServiceImpl implements CategoryService {
    private static final Logger Log = Logger.getLogger(CategoryServiceImpl.class);

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Page<Category> getAllCategories(String filter, int start, int end, String sortBy, String order) {
        try {
            Sort.Direction direction = Sort.Direction.ASC;
            if (order.equalsIgnoreCase("DESC")) direction = Sort.Direction.DESC;

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
        } catch (RuntimeException e) {
            Log.error("Error in CategoryServiceImpl.getAllCategories: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Category> getAllCategories(String ids) {
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
                return categoryRepository.findAllById(itr);
            }

            return null;
        } catch (RuntimeException e) {
            Log.error("Error in CategoryServiceImpl.getAllCategories: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Category> getCategoriesStatusTrue() {
        try {
            return categoryRepository.getAllByStatusIsTrue();
        } catch (Exception e) {
            Log.error("Error in CategoryServiceImpl.getCategoriesStatusTrue: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Override
    public Category getCategoryById(Long id) {
        try {
            return categoryRepository.findById(id).orElse(null);
        } catch (Exception e) {
            Log.error("Error in CategoryServiceImpl.getCategoryById: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deleteCategory(Long id, HttpServletRequest request) {
        try {
            String jwt = jwtUtils.getJwtFromCookies(request, "shop2h_admin");
            String username = jwtUtils.getUserNameFromJwtToken(jwt);
            Category category = categoryRepository.findById(id).orElse(null);
            if (category != null) {
                category.setProducts(null);
                categoryRepository.delete(category);
                Log.info(username + " delete category: " + category.getName());
            }
        } catch (Exception e) {
            Log.error("Error in deleteCategory: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Override
    public Category saveCategory(Category category, HttpServletRequest request) {
        try {
            String jwt = jwtUtils.getJwtFromCookies(request, "shop2h_admin");
            String username = jwtUtils.getUserNameFromJwtToken(jwt);
            Date currentDate = new Date(System.currentTimeMillis());
            category.setReleaseDate(currentDate);
            category.setReleaseBy(userRepository.findByUsername(username).orElse(null));
            Log.info(category.getReleaseBy().getUsername() + " add new category: " + category.getName());
            return categoryRepository.save(category);
        } catch (Exception e) {
            Log.error("Error in CategoryServiceImpl.saveCategory: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Override
    public Category updateCategory(Long id, Category category, HttpServletRequest request) {
        try {
            String jwt = jwtUtils.getJwtFromCookies(request, "shop2h_admin");
            String username = jwtUtils.getUserNameFromJwtToken(jwt);
            Category categoryUpdate = categoryRepository.findById(id).orElse(null);
            categoryUpdate.setName(category.getName());
            categoryUpdate.setStatus(category.isStatus());
            categoryUpdate.setUpdateDate(new Date(System.currentTimeMillis()));
            categoryUpdate.setUpdateBy(userRepository.findByUsername(username).orElse(null));
            Log.info(username + " update category: " + category.getName());
            return categoryRepository.save(categoryUpdate);
        } catch (Exception e) {
            Log.error("Error in updateCategory: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }
}
