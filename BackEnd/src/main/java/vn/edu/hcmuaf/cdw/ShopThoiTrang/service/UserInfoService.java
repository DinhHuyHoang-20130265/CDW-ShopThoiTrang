package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;

import org.springframework.http.ResponseEntity;

public interface UserInfoService {
    ResponseEntity<?> findByUserId(Long id);
}
