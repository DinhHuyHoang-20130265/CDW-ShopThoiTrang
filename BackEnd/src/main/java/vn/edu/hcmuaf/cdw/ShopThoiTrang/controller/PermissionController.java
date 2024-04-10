package vn.edu.hcmuaf.cdw.ShopThoiTrang.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Permission;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.PermissionService;

import java.util.List;

@RestController
@RequestMapping("/api/permission")
@Transactional
public class PermissionController {

    @Autowired
    private PermissionService permissionService;

    @GetMapping
    public ResponseEntity<Page<Permission>> getAllResources(@RequestParam(defaultValue = "0") int start,
                                                            @RequestParam(defaultValue = "{}") String filter,
                                                            @RequestParam(defaultValue = "25") int end,
                                                            @RequestParam(defaultValue = "name") String sort,
                                                            @RequestParam(defaultValue = "DESC") String order) {
        Page<Permission> permissions = permissionService.getAllPermissions(filter, start, end, sort, order);
        return ResponseEntity.ok(permissions);
    }

    @GetMapping("/ids")
    public ResponseEntity<List<Permission>> getAllResources(@RequestParam(defaultValue = "{}") String ids) {
        List<Permission> permissions = permissionService.getAllPermissions(ids);
        return ResponseEntity.ok(permissions);
    }
}
