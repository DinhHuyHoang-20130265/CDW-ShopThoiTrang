package vn.edu.hcmuaf.cdw.ShopThoiTrang.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {
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