package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.RefreshToken;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.exception.TokenRefreshException;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.RefreshTokenRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.UserRepository;

@Service
public class RefreshTokenService {
    private static final Logger Log = Logger.getLogger(RefreshTokenService.class.getName());

    @Value("1200000")
    private Long refreshTokenDurationMs;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private UserRepository userRepository;

    public Optional<RefreshToken> findByToken(String token) {
        try {
            return refreshTokenRepository.findByToken(token);
        } catch (Exception e) {
            Log.error("Error in findByToken: ", e);
            throw new RuntimeException(e);
        }
    }

    public Optional<RefreshToken> findByUser(Long id) {
        try {
            return refreshTokenRepository.findByUser(userRepository.findById(id).orElse(null));
        } catch (Exception e) {
            Log.error("Error in findByUser: ", e);
            throw new RuntimeException(e);
        }
    }


    public RefreshToken createRefreshToken(Long userId) {

        try {
            RefreshToken refreshToken = findByUser(userId).orElse(null);

            if (refreshToken != null) {
                refreshToken.setToken(UUID.randomUUID().toString());
            } else {
                refreshToken = new RefreshToken();
                refreshToken.setUser(userRepository.findById(userId).orElse(null));
                refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
                refreshToken.setToken(UUID.randomUUID().toString());
            }
            refreshToken = refreshTokenRepository.save(refreshToken);
            return refreshToken;
        } catch (Exception e) {
            Log.error("Error in createRefreshToken: ", e);
            throw new RuntimeException(e);
        }
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        try {
            System.out.println(token.getExpiryDate() + " " + Instant.now());
            if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
                refreshTokenRepository.delete(token);
                throw new TokenRefreshException(token.getToken(), "Refresh token was expired. Please make a new signing request");
            }
            return token;
        } catch (TokenRefreshException e) {
            Log.error("Error in verifyExpiration: ", e);
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public int deleteByUserId(Long userId) {
        try {
            return refreshTokenRepository.deleteByUserId(userId);
        } catch (Exception e) {
            Log.error("Error in deleteByUserId: ", e);
            throw new RuntimeException(e);
        }
    }
}