package vn.edu.hcmuaf.cdw.ShopThoiTrang.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Role;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.RoleService;

import java.util.List;

@RestController
@RequestMapping("/api/role")
@Transactional
public class RoleController {


    @Autowired
    private RoleService roleService;

    @GetMapping
    public ResponseEntity<Page<Role>> getAllResources(@RequestParam(defaultValue = "0") int start,
                                                      @RequestParam(defaultValue = "{}") String filter,
                                                      @RequestParam(defaultValue = "25") int end,
                                                      @RequestParam(defaultValue = "name") String sort,
                                                      @RequestParam(defaultValue = "DESC") String order) {
        Page<Role> resources = roleService.getAllRole(filter, start, end, sort, order);
        return ResponseEntity.ok(resources);
    }

    @GetMapping("/ids")
    public ResponseEntity<List<Role>> getAllResources(@RequestParam(defaultValue = "{}") String ids) {
        List<Role> resources = roleService.getAllRole(ids);
        return ResponseEntity.ok(resources);
    }
}
