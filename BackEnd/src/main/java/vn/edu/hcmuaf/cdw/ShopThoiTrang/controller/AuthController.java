package vn.edu.hcmuaf.cdw.ShopThoiTrang.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.ForgotPasswordRequest;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.GoogleTokenDto;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.LoginDto;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.SignupDto;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.UserRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.AuthService;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.GoogleService;

@RestController
@RequestMapping("/api/auth")
@Transactional
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    private GoogleService googleService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    HttpServletRequest request;

    // login
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginDto loginRequest) {
        return authService.login(loginRequest);
    }

    @PostMapping("/google")
    public ResponseEntity<?> authenticateGoogle(@Valid @RequestBody GoogleTokenDto googleTokenDto) {
        return googleService.login_google(googleTokenDto.getToken());
    }

    @PostMapping("/login-admin")
    public ResponseEntity<?> authenticateAdmin(@Valid @RequestBody LoginDto loginRequest) {
        return authService.login_admin(loginRequest);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken() {
        return authService.refreshToken(request);
    }

    // register
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupDto signupDto) {
        return ResponseEntity.ok(authService.signup(signupDto));
    }

    // validate email
    @PostMapping("/validate-email")
    public ResponseEntity<?> validateEmail(@Valid @RequestBody SignupDto signupDto) {
        return ResponseEntity.ok(authService.isValidEmail(signupDto));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@Valid @RequestBody ForgotPasswordRequest forgotPasswordRequest) {
        return ResponseEntity.ok(authService.forgotPassword(forgotPasswordRequest));
    }

    @PostMapping("/forgot-password-confirmation")
    public ResponseEntity<?> forgotPasswordConfirmation(@Valid @RequestBody ForgotPasswordRequest forgotPasswordRequest) {
        return ResponseEntity.ok(authService.forgotPasswordConfirmation(forgotPasswordRequest));
    }

    @PostMapping("/sign-out")
    public ResponseEntity<?> logoutUser() {
        return authService.logout(request);
    }
}