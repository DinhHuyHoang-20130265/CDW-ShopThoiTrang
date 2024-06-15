package vn.edu.hcmuaf.cdw.ShopThoiTrang.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Category;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.CategoryService;

import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private HttpServletRequest request;

    @PreAuthorize("@securityService.isSuperAdmin() or hasAuthority('ROLE_ADMIN')")
    @GetMapping
    public ResponseEntity<Page<Category>> getAllCategories(@RequestParam(defaultValue = "0") int start,
                                                           @RequestParam(defaultValue = "{}") String filter,
                                                           @RequestParam(defaultValue = "25") int end,
                                                           @RequestParam(defaultValue = "name") String sort,
                                                           @RequestParam(defaultValue = "DESC") String order) {
        Page<Category> categories = categoryService.getAllCategories(filter, start, end, sort, order);
        return ResponseEntity.ok(categories);
    }

    @PreAuthorize("@securityService.isSuperAdmin() or hasAuthority('ROLE_ADMIN')")
    @GetMapping("/ids")
    public ResponseEntity<List<Category>> getAllCategories(@RequestParam(defaultValue = "{}") String ids) {
        List<Category> categories = categoryService.getAllCategories(ids);
        return ResponseEntity.ok(categories);
    }

    @PreAuthorize("@securityService.isSuperAdmin() or hasAuthority('ROLE_ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        Category category = categoryService.getCategoryById(id);
        return ResponseEntity.ok(category);
    }

    @PreAuthorize("@securityService.isSuperAdmin() or (hasAuthority('ROLE_ADMIN') and hasAuthority('CATEGORY_CREATE'))")
    @PostMapping
    public ResponseEntity<Category> saveCategory(@RequestBody Category category) {
        Category savedCategory = categoryService.saveCategory(category, request);
        return ResponseEntity.ok(savedCategory);
    }

    @PreAuthorize("@securityService.isSuperAdmin() or (hasAuthority('ROLE_ADMIN') and hasAuthority('CATEGORY_UPDATE'))")
    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category category) {
        Category updatedCategory = categoryService.updateCategory(id, category, request);
        return ResponseEntity.ok(updatedCategory);
    }

    @PreAuthorize("@securityService.isSuperAdmin() or (hasAuthority('ROLE_ADMIN') and hasAuthority('CATEGORY_DELETE'))")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id, request);
        return ResponseEntity.ok("Category deleted successfully");
    }

}
