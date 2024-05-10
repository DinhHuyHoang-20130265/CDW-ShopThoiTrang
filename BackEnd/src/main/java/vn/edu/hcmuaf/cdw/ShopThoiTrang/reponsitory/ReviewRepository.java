package vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Review;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Page<Review> findAll(Specification<Review> specification, Pageable pageable);

    List<Review> findAllById(Iterable<Long> ids);
}
