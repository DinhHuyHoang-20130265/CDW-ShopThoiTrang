package vn.edu.hcmuaf.cdw.ShopThoiTrang.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.UserInfoRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    UserInfoRepository userInfoRepository;
    @GetMapping("/all")
    public String allAccess() {
        return "Public Content.";
    }

    @GetMapping("/user")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public String userAccess() {
        return "User Content.";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public String adminAccess() {
        return "Admin Board.";
    }

    @GetMapping("/admin-update")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') and hasAuthority('USER_UPDATE')")
    public String adminUpdateUser() {
        return "Admin User Update Board.";
    }

    @GetMapping("/admin-create")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') and hasAuthority('USER_CREATE')")
    public String adminCreateUser() {
        return "Admin User create Board.";
    }
}