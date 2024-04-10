package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;

import org.springframework.data.domain.Page;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Role;

import java.util.List;

public interface RoleService {
    Page<Role> getAllRole(String filter, int start, int end, String sort, String order);

    List<Role> getAllRole(String ids);
}
