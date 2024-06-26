package vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Permission;

import java.util.List;

public interface PermissionRepository extends JpaRepository<Permission, Long> {
    Page<Permission> findAll(Specification<Permission> specification, Pageable pageable);

    List<Permission> findAllById(Iterable<Long> ids);
}
