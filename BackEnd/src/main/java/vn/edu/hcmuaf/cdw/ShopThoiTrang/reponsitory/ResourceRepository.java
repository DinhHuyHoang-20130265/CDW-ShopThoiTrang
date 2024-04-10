package vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Resource;

import java.util.List;

public interface ResourceRepository extends JpaRepository<Resource, Long> {
    Page<Resource> findAll(Specification<Resource> specification, Pageable pageable);

    List<Resource> findAllById(Iterable<Long> ids);
}
