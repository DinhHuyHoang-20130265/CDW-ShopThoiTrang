package vn.edu.hcmuaf.cdw.ShopThoiTrang.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Resource;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.ResourceService;

import java.util.List;

@RestController
@RequestMapping("/api/resource")
@Transactional
public class ResourceController {

    @Autowired
    private ResourceService resourceService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or @securityService.isSuperAdmin()")
    @GetMapping
    public ResponseEntity<Page<Resource>> getAllResources(@RequestParam(defaultValue = "0") int start,
                                                          @RequestParam(defaultValue = "{}") String filter,
                                                          @RequestParam(defaultValue = "25") int end,
                                                          @RequestParam(defaultValue = "name") String sort,
                                                          @RequestParam(defaultValue = "DESC") String order) {
        Page<Resource> resources = resourceService.getAllResources(filter, start, end, sort, order);
        return ResponseEntity.ok(resources);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or @securityService.isSuperAdmin()")
    @GetMapping("/ids")
    public ResponseEntity<List<Resource>> getAllResources(@RequestParam(defaultValue = "{}") String ids) {
        List<Resource> resources = resourceService.getAllResources(ids);
        return ResponseEntity.ok(resources);
    }
}
