package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;

import org.springframework.http.ResponseEntity;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.LoginDto;

public interface AuthService {
    ResponseEntity<?> login(LoginDto loginDto);

}