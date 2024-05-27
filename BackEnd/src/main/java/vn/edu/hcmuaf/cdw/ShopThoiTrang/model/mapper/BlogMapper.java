package vn.edu.hcmuaf.cdw.ShopThoiTrang.model.mapper;

import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Blog;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.BlogDto;

import java.util.List;
import java.util.stream.Collectors;

public class BlogMapper {
    public static BlogDto toBlogDto(Blog blog) {
        BlogDto tmp = new BlogDto();
        tmp.setId(blog.getId());
        tmp.setTitle(blog.getTitle());
        tmp.setDescription(blog.getDescription());
        tmp.setContent(blog.getContent());
        tmp.setStatus(blog.isStatus());
        tmp.setThumbnail(blog.getThumbnail());
        tmp.setUpdateDate(blog.getUpdateDate());
        tmp.setUpdateBy(blog.getUpdateBy().getUsername());
        return tmp;
    }

    public static List<BlogDto> toBlogDto(List<Blog> blogs) {
        return blogs.stream().map(BlogMapper::toBlogDto).collect(Collectors.toList());
    }

}
