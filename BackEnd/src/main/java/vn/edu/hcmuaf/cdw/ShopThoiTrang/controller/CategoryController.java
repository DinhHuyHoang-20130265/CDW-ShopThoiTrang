package vn.edu.hcmuaf.cdw.ShopThoiTrang.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Category;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.CategoryService;

import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<Page<Category>> getAllCategories( @RequestParam(defaultValue = "0") int start,
                                                            @RequestParam(defaultValue = "{}") String filter,
                                                            @RequestParam(defaultValue = "25") int end,
                                                            @RequestParam(defaultValue = "name") String sort,
                                                            @RequestParam(defaultValue = "DESC") String order) {
        Page<Category> categories = categoryService.getAllCategories(filter, start, end, sort, order);
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/ids")
    public ResponseEntity<List<Category>> getAllCategories( @RequestParam(defaultValue = "{}") String ids) {
        List<Category> categories = categoryService.getAllCategories(ids);
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        Category category = categoryService.getCategoryById(id);
        return ResponseEntity.ok(category);
    }

    @PostMapping
    public ResponseEntity<Category> saveCategory(@RequestBody Category category) {
        Category savedCategory = categoryService.saveCategory(category);
        return ResponseEntity.ok(savedCategory);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category category) {
        Category updatedCategory = categoryService.updateCategory(id, category);
        return ResponseEntity.ok(updatedCategory);
    }



}
