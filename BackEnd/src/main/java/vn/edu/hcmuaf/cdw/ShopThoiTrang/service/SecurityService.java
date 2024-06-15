package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SecurityService {

    @Autowired
    private AuthenticationFacade authenticationFacade;

    public boolean isSuperAdmin() {
        return authenticationFacade.getAuthentication().getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_SUPER_ADMIN"));
    }

    public boolean isUser() {
        return authenticationFacade.getAuthentication().getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_USER"));
    }
}