package vn.edu.hcmuaf.cdw.ShopThoiTrang.JWT;

import java.util.Arrays;
import java.util.Date;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.*;
import org.springframework.web.util.WebUtils;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.User;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl.UserDetailsImpl;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("0dbdaf92f6405b2d6293e8f800858d0ecb80af8d4b02d6002ea05dbd7e9badb22d805b91bf10828e6bdf7694bf24df152971cf22a45a33ef955538b015325048")
    private String jwtSecret;

    @Value("12000000")
    private int jwtExpirationMs;

    public String getJwtFromCookies(HttpServletRequest request, String jwtCookie_name) {
        return getCookieValueByName(request, jwtCookie_name);
    }

    public String getJwtRefreshFromCookies(HttpServletRequest request, String jwtRefreshCookie_name) {
        return getCookieValueByName(request, jwtRefreshCookie_name);
    }

    public ResponseCookie generateJwtCookie(UserDetailsImpl userPrincipal, String jwtCookie_name) {
        String jwt = generateTokenFromUsername(userPrincipal.getUsername());
        return ResponseCookie.from(jwtCookie_name, jwt).path("/api").maxAge(24 * 60 * 60).httpOnly(true).secure(true).sameSite("None").build();
    }

    public ResponseCookie generateJwtCookie(User user, String jwtCookie_name) {
        String jwt = generateTokenFromUsername(user.getUsername());
        return generateCookie(jwtCookie_name, jwt, "/api");
    }

    public ResponseCookie generateRefreshJwtCookie(String refreshToken, String jwtRefreshCookie_name) {
        return generateCookie(jwtRefreshCookie_name, refreshToken, "/api");
    }

    private ResponseCookie generateCookie(String name, String value, String path) {
        return ResponseCookie.from(name, value).path(path).maxAge(24 * 60 * 60).httpOnly(true).secure(true).sameSite("None").build();
    }

    public ResponseCookie getCleanJwtCookie(String jwtCookie_name) {
        return ResponseCookie.from(jwtCookie_name, null).path("/api").secure(true).sameSite("None").build();
    }

    public String generateTokenFromUsername(String username) {
        return Jwts.builder().setSubject(username).setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs)).signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        try {
            return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
        } catch (Exception e) {
            return null;
        }
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        } catch (Exception e) {
            logger.error("JWT token is invalid: {}", e.getMessage());
        }
        return false;
    }

    public ResponseCookie getCleanJwtRefreshCookie(String jwtRefreshCookie_name) {
        return ResponseCookie.from(jwtRefreshCookie_name, null).path("/api").secure(true).sameSite("None").build();
    }

    private String getCookieValueByName(HttpServletRequest request, String name) {
        Cookie cookie = WebUtils.getCookie(request, name);
        if (cookie != null) {
            return cookie.getValue();
        } else {
            return null;
        }
    }
}
