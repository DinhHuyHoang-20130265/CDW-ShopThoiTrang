package vn.edu.hcmuaf.cdw.ShopThoiTrang.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Blog;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.BlogService;

@RestController
@RequestMapping("/api/blog")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @GetMapping
    public ResponseEntity<?> getAllBlogs(@RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = "{}") String filter,
                                         @RequestParam(defaultValue = "25") int perPage,
                                         @RequestParam(defaultValue = "title") String sort,
                                         @RequestParam(defaultValue = "DESC") String order) {
        Page<Blog> blogs = blogService.getAllBlogs(filter, page, perPage, sort, order);
        return ResponseEntity.ok(blogs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBlogById(@PathVariable Long id) {
        return ResponseEntity.ok(blogService.getBlogById(id));
    }

}
