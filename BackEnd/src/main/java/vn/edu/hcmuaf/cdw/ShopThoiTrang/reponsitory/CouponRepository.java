package vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Coupon;

import java.util.List;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long> {
    List<Coupon> getAllByStatusIsTrue();

    Page<Coupon> findAll(Specification<Coupon> specification, Pageable pageable);

    List<Coupon> findAllById(Iterable<Long> ids);
}
