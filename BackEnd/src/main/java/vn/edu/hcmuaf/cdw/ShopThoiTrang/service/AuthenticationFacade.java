package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;

import org.springframework.security.core.Authentication;

public interface AuthenticationFacade {
    Authentication getAuthentication();
}