package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;

import org.springframework.http.ResponseEntity;

public interface GoogleService {
    ResponseEntity<?> login_google(String code);
}
