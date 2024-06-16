package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Category;

import java.util.List;

public interface CategoryService {
    Page<Category> getAllCategories(String filter, int start, int end, String sortBy, String order);

    List<Category> getAllCategories(String ids);

    List<Category> getCategoriesStatusTrue();

    Category getCategoryById(Long id);

    Category saveCategory(Category category, HttpServletRequest request);

    Category updateCategory(Long id, Category category, HttpServletRequest request);

    void deleteCategory(Long id, HttpServletRequest request);
}
