package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;

import org.springframework.security.core.Authentication;

public interface AuthorizerService {
    boolean authorize(Authentication authentication, String action, Object callerObj);
}
