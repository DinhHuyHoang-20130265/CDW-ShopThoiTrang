package vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Blog;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Product;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
    Page<Blog> findAll(Specification<Blog> specification, Pageable pageable);

}
