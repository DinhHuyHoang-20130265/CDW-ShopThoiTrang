package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Blog;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.BlogRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.BlogService;

import java.nio.charset.StandardCharsets;
import java.sql.Date;

import org.springframework.data.jpa.domain.Specification;


@Service
public class BlogServiceImpl implements BlogService {
    @Autowired
    private BlogRepository blogRepository;


    @Override
    public Page<Blog> getAllBlogs(String filter, int page, int perPage, String sortBy, String order) {
        Sort.Direction direction = Sort.Direction.ASC;
        if (order.equals("DESC")) {
            direction = Sort.Direction.DESC;
        }
        JsonNode filterJson ;
        try {
            filterJson = new ObjectMapper().readTree(java.net.URLDecoder.decode(filter, StandardCharsets.UTF_8));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        Specification<Blog> specification = (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();
            if (filterJson.has("title")) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("title"), "%" + filterJson.get("title").asText() + "%"));
            }
            if (filterJson.has("status")) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("status"), filterJson.get("status").asBoolean()));
            }
            return predicate;
        };
        if (sortBy.equals("title")) {
            return blogRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, "title")));
        }
        if (sortBy.equals("status")) {
            return blogRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, "status")));
        }

        return blogRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, sortBy)));
    }

    @Override
    public Blog getBlogById(Long id) {
        return blogRepository.findById(id).orElse(null);
    }

    @Override
    public Blog saveBlog(Blog blog) {
        Date date = new Date(System.currentTimeMillis());
        blog.setCreateDate(date);
        blog.setUpdateDate(date);
        return blogRepository.save(blog);
    }

    @Override
    public Blog updateBlog(Long id, Blog blog) {
        Blog existingBlog = blogRepository.findById(id).orElse(null);
        if (existingBlog != null) {
            existingBlog.setTitle(blog.getTitle());
            existingBlog.setContent(blog.getContent());
            existingBlog.setStatus(blog.isStatus());
            existingBlog.setUpdateDate(new Date(System.currentTimeMillis()));
            existingBlog.setUpdateBy(blog.getUpdateBy());
        }
        return blogRepository.save(existingBlog);
    }
}
