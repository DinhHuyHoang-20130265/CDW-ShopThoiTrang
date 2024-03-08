package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;

import org.springframework.http.ResponseEntity;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.LoginDto;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.SignupDto;

public interface AuthService {
    ResponseEntity<?> login(LoginDto loginDto);

    ResponseEntity<?> signup(SignupDto signupDto);

    ResponseEntity<?> isValidEmail(SignupDto signupDto);
}