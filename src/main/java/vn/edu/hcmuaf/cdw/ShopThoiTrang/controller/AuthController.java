package vn.edu.hcmuaf.cdw.ShopThoiTrang.controller;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.LoginDto;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.SignupDto;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.AuthService;
@RestController
@RequestMapping("/api/auth")
@Transactional
public class AuthController {

    @Autowired
    private AuthService authService;


    // login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        return ResponseEntity.ok(authService.login(loginDto));
    }

    // register
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupDto signupDto) {
        return ResponseEntity.ok(authService.signup(signupDto));
    }

    // validate email
    @PostMapping("/validate-email")
    public ResponseEntity<?> validateEmail(@RequestBody SignupDto signupDto) {
        return ResponseEntity.ok(authService.isValidEmail(signupDto));
    }

}