package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.JWT.JwtUtils;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.RefreshToken;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Role;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.User;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.UserInfo;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.exception.TokenRefreshException;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.UserInfoRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.UserRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.AuthService;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.EmailService;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.RefreshTokenService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    RefreshTokenService refreshTokenService;
    private final Map<String, String> otpMap = new HashMap<>();

    @Override
    public ResponseEntity<?> login(LoginDto loginDto) {
        User user = userRepository.findByUsername(loginDto.getUsername()).orElse(null);
        if (user == null) {
            return new ResponseEntity<>("username not found", HttpStatus.NOT_FOUND);
        }
        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            return new ResponseEntity<>("wrong password", HttpStatus.EXPECTATION_FAILED);
        }
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken((UserDetailsImpl) authentication.getPrincipal());

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> permissions = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());

        return ResponseEntity.ok(new JwtResponse(jwt,
                refreshToken.getToken(),
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                permissions));
    }

    @Override
    public ResponseEntity<?> refreshToken(TokenRefreshRequest request) {

        String requestRefreshToken = request.getRefreshToken();

        return ResponseEntity.ok(refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String token = jwtUtils.generateTokenFromUsername(user.getUsername());
                    return ResponseEntity.ok(new TokenRefreshResponse(token, requestRefreshToken));
                })
                .orElseThrow(() -> new TokenRefreshException(requestRefreshToken,
                        "Refresh token is not in database!")));
    }

    @Override
    public ResponseEntity<?> signup(SignupDto signupDto) {
        if (userInfoRepository.existsByEmail(signupDto.getEmail())) {
            return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
        }
        String otp = generateOTP();
        otpMap.put(signupDto.getEmail(), otp);

        scheduleOTPCleanup(signupDto.getEmail());
        System.out.println(otpMap);

        emailService.sendEmail(signupDto.getEmail(), otp, "OTP for registration");

        return new ResponseEntity<>("OTP for sign up new Account has sent to your email", HttpStatus.OK);
    }

    private String generateOTP() {
        return String.format("%06d", new Random().nextInt(999999));
    }

    private void scheduleOTPCleanup(String email) {
        new Thread(() -> {
            try {
                TimeUnit.MINUTES.sleep(3);
                otpMap.remove(email);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }).start();
    }

    private boolean isOTPValid(String email) {
        return otpMap.containsKey(email);
    }

    @Override
    public ResponseEntity<?> isValidEmail(SignupDto signupDto) {
        if (otpMap.isEmpty() || !isOTPValid(signupDto.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("OTP has expired.");
        }

        if (!otpMap.get(signupDto.getEmail()).equals(signupDto.getOtp())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid OTP.");
        }
        User user = new User();
        user.setUserInfo(new UserInfo());
        user.getUserInfo().setEmail(signupDto.getEmail());
        user.getUserInfo().setFullName(signupDto.getFullName());
        user.setPasswordEncrypted(passwordEncoder.encode(signupDto.getPassword()));
        user.setEnabled(true);
        user.setUsername(signupDto.getUsername());
        userRepository.save(user);

        otpMap.remove(signupDto.getEmail());
        return ResponseEntity.ok("Signup successful.");
    }


}