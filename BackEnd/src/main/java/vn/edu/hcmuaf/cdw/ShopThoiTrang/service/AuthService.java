package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.ForgotPasswordRequest;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.LoginDto;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.SignupDto;

public interface AuthService {
    ResponseEntity<?> login(LoginDto loginDto);

    ResponseEntity<?> signup(SignupDto signupDto);

    ResponseEntity<?> isValidEmail(SignupDto signupDto);

    ResponseEntity<?> login_admin(LoginDto loginDto);

    ResponseEntity<?> refreshToken(HttpServletRequest request);

    ResponseEntity<?> forgotPassword(ForgotPasswordRequest forgotPasswordRequest);

    ResponseEntity<?> forgotPasswordConfirmation(ForgotPasswordRequest forgotPasswordRequest);

    ResponseEntity<?> logout(HttpServletRequest request);
}