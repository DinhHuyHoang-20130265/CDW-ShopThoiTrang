package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ResolvableType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.AuthorizerService;

import java.lang.annotation.Annotation;
import java.util.*;

@Service("authorizerService")
public class AuthorizerServiceImpl implements AuthorizerService {

    private final Logger logger = LoggerFactory.getLogger(AuthorizerServiceImpl.class);

    @Override
    public boolean authorize(Authentication authentication, String action, Object callerObj) {
        String securedPath = extractSecuredPath(callerObj);
        if (securedPath == null || securedPath.trim().isEmpty()) {//login, logout
            return true;
        }
        String menuCode = securedPath.substring(1);//Bỏ dấu "/" ở đầu Path
        boolean isAllow = false;
        try {
            UsernamePasswordAuthenticationToken user = (UsernamePasswordAuthenticationToken) authentication;
            if (user == null) {
                return isAllow;
            }
            String userId = (String) user.getPrincipal();
            if (userId == null || userId.trim().isEmpty()) {
                return isAllow;
            }
            //Truy vấn vào CSDL theo userId + menuCode + action
            //Nếu có quyền thì
            {
                isAllow = true;
            }
        } catch (Exception e) {
            logger.error(e.toString(), e);
            throw e;
        }
        return isAllow;
    }

    private String extractSecuredPath(Object callerObj) {
        Class<?> clazz = ResolvableType.forClass(callerObj.getClass()).getRawClass();
        assert clazz != null;
        Optional<Annotation> annotation = Arrays.stream(clazz.getAnnotations()).filter((ann) -> ann instanceof RequestMapping).findFirst();
        logger.debug("FOUND CALLER CLASS: {}", ResolvableType.forClass(callerObj.getClass()).getType().getTypeName());
        return annotation.map(value -> ((RequestMapping) value).value()[0]).orElse(null);
    }
}