package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.criteria.Predicate;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Blog;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.BlogDto;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.BlogRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.BlogService;

import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import static vn.edu.hcmuaf.cdw.ShopThoiTrang.model.mapper.BlogMapper.toBlogDto;


@Service
public class BlogServiceImpl implements BlogService {

    private static final Logger Log = Logger.getLogger(BlogServiceImpl.class.getName());

    @Autowired
    private BlogRepository blogRepository;


    @Override
    public Page<Blog> getAllBlogs(String filter, int page, int perPage, String sortBy, String order) {
        try {
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
        } catch (RuntimeException e) {
            Log.error("Error in getAllBlogs: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<BlogDto> getBlogsStatusTrue() {
        try {
            return toBlogDto(blogRepository.findAllByStatusTrue());
        } catch (Exception e) {
            Log.error("Error in getBlogsStatusTrue: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Override
    public Blog getBlogById(Long id) {
        try {
            return blogRepository.findById(id).orElse(null);
        } catch (Exception e) {
            Log.error("Error in getBlogById: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Override
    public Blog saveBlog(Blog blog) {
        try {
            Date date = new Date(System.currentTimeMillis());
            blog.setCreateDate(date);
            blog.setUpdateDate(date);
            Log.info(blog.getCreateBy().getUsername() +" add new blog: " + blog.getTitle());
            return blogRepository.save(blog);
        } catch (Exception e) {
            Log.error("Error in saveBlog: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Override
    public Blog updateBlog(Long id, Blog blog) {
        try {
            Blog existingBlog = blogRepository.findById(id).orElse(null);
            if (existingBlog != null) {
                existingBlog.setTitle(blog.getTitle());
                existingBlog.setContent(blog.getContent());
                existingBlog.setStatus(blog.isStatus());
                existingBlog.setUpdateDate(new Date(System.currentTimeMillis()));
                existingBlog.setUpdateBy(blog.getUpdateBy());
            }
            Log.info(blog.getUpdateBy().getUsername() +" update blog: " + blog.getTitle());
            return blogRepository.save(existingBlog);
        } catch (Exception e) {
            Log.error("Error in updateBlog: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }
}
