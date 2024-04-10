package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;
import org.springframework.data.domain.Page;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Permission;

import java.util.List;
public interface PermissionService {
    Page<Permission> getAllPermissions(String filter, int page, int perPage, String sortBy, String order);
    List<Permission> getAllPermissions(String ids);
}
