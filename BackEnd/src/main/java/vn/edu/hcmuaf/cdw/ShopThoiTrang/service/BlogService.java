package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Blog;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.BlogDto;

import java.util.List;

public interface BlogService {
    Page<Blog> getAllBlogs(String filter, int page, int perPage, String sortBy, String order);

    List<BlogDto> getBlogsStatusTrue();

    Blog getBlogById(Long id);

    Blog saveBlog(Blog blog, HttpServletRequest request);
    Blog updateBlog(Long id, Blog blog, HttpServletRequest request);


}
