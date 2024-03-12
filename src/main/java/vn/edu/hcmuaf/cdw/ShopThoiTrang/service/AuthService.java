package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;

import org.springframework.http.ResponseEntity;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.ForgotPasswordRequest;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.LoginDto;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.SignupDto;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.TokenRefreshRequest;

public interface AuthService {
    ResponseEntity<?> login(LoginDto loginDto);

    ResponseEntity<?> signup(SignupDto signupDto);

    ResponseEntity<?> isValidEmail(SignupDto signupDto);

    ResponseEntity<?> refreshToken(TokenRefreshRequest request);

    ResponseEntity<?> forgotPassword(ForgotPasswordRequest forgotPasswordRequest);

    ResponseEntity<?> forgotPasswordConfirmation(ForgotPasswordRequest forgotPasswordRequest);
}