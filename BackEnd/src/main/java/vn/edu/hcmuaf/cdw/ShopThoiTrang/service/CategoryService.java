package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;

import org.springframework.data.domain.Page;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Category;

import java.util.List;

public interface CategoryService {
    Page<Category> getAllCategories(String filter, int start, int end, String sortBy, String order);
    List<Category> getCategoriesStatusTrue();
}