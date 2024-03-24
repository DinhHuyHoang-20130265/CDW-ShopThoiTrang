package vn.edu.hcmuaf.cdw.ShopThoiTrang.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.JWT.JwtUtils;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.UserInfoService;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private HttpServletRequest request;

    @Autowired
    UserInfoService userInfoService;

    @Autowired
    UserService userService;

    @GetMapping("/info")
    public ResponseEntity<?> userInfo() {
        String jwt = jwtUtils.getJwtFromCookies(request);
        if (jwt == null) {
            return ResponseEntity.badRequest().body("Token is null");
        }
        String username = jwtUtils.getUserNameFromJwtToken(jwt);
        return userInfoService.findById(userService.getUserByUsername(username).getId());
    }
}
