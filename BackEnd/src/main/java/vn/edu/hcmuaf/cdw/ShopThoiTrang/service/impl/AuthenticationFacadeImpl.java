package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.AuthenticationFacade;

@Component
public class AuthenticationFacadeImpl implements AuthenticationFacade {
    @Override
    public Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }
}

