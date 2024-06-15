package vn.edu.hcmuaf.cdw.ShopThoiTrang.controller;

import jakarta.annotation.security.PermitAll;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Blog;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.BlogService;

@RestController
@RequestMapping("/api/blog")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @Autowired
    private HttpServletRequest request;

    @GetMapping
    public ResponseEntity<?> getAllBlogs(@RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = "{}") String filter,
                                         @RequestParam(defaultValue = "25") int perPage,
                                         @RequestParam(defaultValue = "title") String sort,
                                         @RequestParam(defaultValue = "DESC") String order) {
        Page<Blog> blogs = blogService.getAllBlogs(filter, page, perPage, sort, order);
        return ResponseEntity.ok(blogs);
    }

    @GetMapping("/user")
    public ResponseEntity<?> getBlogsStatusTrue() {
        return ResponseEntity.ok(blogService.getBlogsStatusTrue());
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getBlogById(@PathVariable Long id) {
        return ResponseEntity.ok(blogService.getBlogById(id));
    }

    @PreAuthorize("(hasAuthority('ROLE_ADMIN') and hasAuthority('BLOG_CREATE')) or @securityService.isSuperAdmin()")
    @PostMapping
    public ResponseEntity<?> saveBlog(@RequestBody Blog blog) {
        return ResponseEntity.ok(blogService.saveBlog(blog, request));
    }

    @PreAuthorize("(hasAuthority('ROLE_ADMIN') and hasAuthority('BLOG_UPDATE')) or @securityService.isSuperAdmin()")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBlog(@PathVariable Long id, @RequestBody Blog blog) {
        return ResponseEntity.ok(blogService.updateBlog(id, blog, request));
    }

    @PreAuthorize("(hasAuthority('ROLE_ADMIN') and hasAuthority('BLOG_DELETE')) or @securityService.isSuperAdmin()")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBlog(@PathVariable Long id) {
        return ResponseEntity.ok(blogService.deleteBlog(id, request));
    }

}
