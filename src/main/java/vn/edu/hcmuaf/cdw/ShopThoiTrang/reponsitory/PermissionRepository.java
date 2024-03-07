package vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Permission;

public interface PermissionRepository extends JpaRepository<Permission, Long> {
}
