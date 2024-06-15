package vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Product;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByStatusTrueAndDeletedFalse();

    Page<Product> findAll(Specification<Product> specification, Pageable pageable);
}
