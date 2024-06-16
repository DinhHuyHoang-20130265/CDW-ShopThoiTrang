package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import jakarta.servlet.http.HttpServletRequest;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
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

import java.sql.Date;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
public class AuthServiceImpl implements AuthService {
    private static final Logger Log = Logger.getLogger(AuthServiceImpl.class.getName());

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

    private final Map<String, String> otpMapForgot = new HashMap<>();

    @Override
    public ResponseEntity<?> login(LoginDto loginDto) {
        User user = userRepository.findByUsername(loginDto.getUsername()).orElse(null);
        if (user == null || !user.isEnabled() || user.isDeleted()) {
            Log.warn("username: " + loginDto.getUsername() + " not found");
            return new ResponseEntity<>("username not found", HttpStatus.NOT_FOUND);
        }
        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            Log.warn("username: " + loginDto.getUsername() + " wrong password");
            return new ResponseEntity<>("wrong password", HttpStatus.EXPECTATION_FAILED);
        }
        if (!user.getRole().getName().equals("USER")) {
            Log.warn("username: " + loginDto.getUsername() + " unauthorized");
            return new ResponseEntity<>("unauthorized ", HttpStatus.NOT_ACCEPTABLE);
        }
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            List<String> permissions = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());
            RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());

            ResponseCookie jwtRefreshCookie = jwtUtils.generateRefreshJwtCookie(refreshToken.getToken(), "shop2h_refresh");

            ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails, "shop2h");

            Log.info(loginDto.getUsername() + " logged in");
            return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                    .header(HttpHeaders.SET_COOKIE, jwtRefreshCookie.toString()).body(new JwtResponse(
                            userDetails.getId(),
                            userDetails.getUsername(),
                            permissions));
        } catch (AuthenticationException e) {
            Log.error("error while login", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<?> login_admin(LoginDto loginDto) {
        User user = userRepository.findByUsername(loginDto.getUsername()).orElse(null);
        if (user == null || !user.isEnabled() || user.isDeleted()) {
            Log.warn("username not found");
            return new ResponseEntity<>("username not found", HttpStatus.NOT_FOUND);
        }
        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            Log.warn("wrong password");
            return new ResponseEntity<>("wrong password", HttpStatus.EXPECTATION_FAILED);
        }
        if (!(user.getRole().getName().equals("ADMIN") || user.getRole().getName().equals("SUPER_ADMIN"))) {
            System.out.println(user.getRole().getName());
            Log.warn("unauthorized");
            return new ResponseEntity<>("unauthorized ", HttpStatus.NOT_ACCEPTABLE);
        }
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            List<String> permissions = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());
            RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());

            ResponseCookie jwtRefreshCookie = jwtUtils.generateRefreshJwtCookie(refreshToken.getToken(), "shop2h_admin_refresh");

            ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails, "shop2h_admin");

            return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                    .header(HttpHeaders.SET_COOKIE, jwtRefreshCookie.toString()).body(new JwtResponse(
                            userDetails.getId(),
                            userDetails.getUsername(),
                            permissions));
        } catch (AuthenticationException e) {
            Log.error("error while login", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<?> refreshToken(HttpServletRequest request) {

        try {
            String requestOrigin = request.getHeader("origin");
            String jwtName = requestOrigin.equals("http://localhost:3000") ? "shop2h" : requestOrigin.equals("http://localhost:3001") ? "shop2h_admin" : null;
            if (jwtName == null)
                throw new RuntimeException("Unknown site");
            String refreshToken = jwtUtils.getJwtRefreshFromCookies(request, jwtName + "_refresh");
            if ((refreshToken != null) && (!refreshToken.isEmpty())) {
                return refreshTokenService.findByToken(refreshToken)
                        .map(refreshTokenService::verifyExpiration)
                        .map(RefreshToken::getUser)
                        .map(user -> {
                            ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(user, jwtName);
                            return ResponseEntity.ok()
                                    .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                                    .body("Token is refreshed successfully!");
                        })
                        .orElseThrow(() -> new TokenRefreshException(refreshToken, "Refresh token is not in database!"));
            }
            Log.debug("Refresh Token is empty!");
            return ResponseEntity.badRequest().body("Refresh Token is empty!");
        } catch (TokenRefreshException e) {
            Log.error("error while refresh token", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<?> forgotPassword(ForgotPasswordRequest forgotPasswordRequest) {
        try {
            if (userInfoRepository.existsByEmail(forgotPasswordRequest.getEmail())) {
                String otp = generateOTP();
                otpMapForgot.put(forgotPasswordRequest.getEmail(), otp);

                scheduleOTPCleanup(forgotPasswordRequest.getEmail(), otpMapForgot);
                System.out.println(otpMapForgot);

                emailService.sendResetPasswordEmail(forgotPasswordRequest.getEmail(), otp, "Reset password");
                Log.info("OTP for forgot password has sent to your email");
                return new ResponseEntity<>("OTP for forgot password has sent to your email", HttpStatus.OK);
            }
            return new ResponseEntity<>("Email doesn't Exits", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            Log.error("error while forgot password", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<?> forgotPasswordConfirmation(ForgotPasswordRequest forgotPasswordRequest) {
        try {
            if (otpMapForgot.isEmpty() || !isOTPValid(forgotPasswordRequest.getEmail(), otpMapForgot)) {
                Log.warn("OTP has expired");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("OTP has expired.");
            }

            if (!otpMapForgot.get(forgotPasswordRequest.getEmail()).equals(forgotPasswordRequest.getOtp())) {
                Log.warn("Invalid OTP");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid OTP.");
            }
            User user = userInfoRepository.findByEmail(forgotPasswordRequest.getEmail()).getUser();
            user.setPasswordEncrypted(passwordEncoder.encode(forgotPasswordRequest.getNewPassword()));
            userRepository.save(user);
            Log.info(user.getUsername() + " changed password successful");
            otpMapForgot.remove(forgotPasswordRequest.getEmail());
            return ResponseEntity.ok("Password changed successful.");
        } catch (Exception e) {
            Log.error("error while forgot password confirmation", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<?> logout(HttpServletRequest request) {
        Log.info("logout");
        try {
            String requestOrigin = request.getHeader("origin");
            String jwtName = requestOrigin.equals("http://localhost:3000") ? "shop2h" : requestOrigin.equals("http://localhost:3001") ? "shop2h_admin" : null;
            Object principle = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (!Objects.equals(principle.toString(), "anonymousUser")) {
                Long userId = ((UserDetailsImpl) principle).getId();
                refreshTokenService.deleteByUserId(userId);
            }

            ResponseCookie jwtCookie = jwtUtils.getCleanJwtCookie(jwtName);
            ResponseCookie jwtRefreshCookie = jwtUtils.getCleanJwtRefreshCookie(jwtName + "_refresh");
            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                    .header(HttpHeaders.SET_COOKIE, jwtRefreshCookie.toString())
                    .body("You've been signed out!");
        } catch (Exception e) {
            Log.error("error while logout", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<?> signup(SignupDto signupDto) {
        try {
            if (userInfoRepository.existsByEmail(signupDto.getEmail())) {
                return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
            }
            if (userRepository.existsByUsername(signupDto.getUsername())) {
                return new ResponseEntity<>("Username already exists", HttpStatus.BAD_REQUEST);
            }
            String otp = generateOTP();
            otpMap.put(signupDto.getEmail(), otp);

            scheduleOTPCleanup(signupDto.getEmail(), otpMap);
            System.out.println(otpMap);

            emailService.sendEmail(signupDto.getEmail(), otp, "OTP for registration");
            Log.info("OTP for sign up new Account has sent to email: " + signupDto.getEmail());
            return new ResponseEntity<>("OTP for sign up new Account has sent to your email", HttpStatus.OK);
        } catch (Exception e) {
            Log.error("error while signup", e);
            throw new RuntimeException(e);
        }
    }

    private String generateOTP() {
        return String.format("%06d", new Random().nextInt(999999));
    }

    private void scheduleOTPCleanup(String email, Map<String, String> otp) {
        new Thread(() -> {
            try {
                TimeUnit.MINUTES.sleep(3);
                otp.remove(email);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }).start();
    }

    private boolean isOTPValid(String email, Map<String, String> otp) {
        return otp.containsKey(email);
    }

    @Override
    public ResponseEntity<?> isValidEmail(SignupDto signupDto) {
        try {
            System.out.println(signupDto);
            System.out.println(otpMap);
            if (otpMap.isEmpty() || !isOTPValid(signupDto.getEmail(), otpMap)) {
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
            user.setRole(new Role(2L, "USER"));
            user.setEnabled(true);
            user.setUsername(signupDto.getUsername());
            user.getUserInfo().setUser(user);
            Date date = new Date(System.currentTimeMillis());
            user.setCreatedDate(date);
            user.setUpdateDate(date);
            userRepository.save(user);

            otpMap.remove(signupDto.getEmail());
            Log.info("Signup successful with email: " + signupDto.getEmail() + " and username: " + signupDto.getUsername());
            return ResponseEntity.ok("Signup successful.");
        } catch (Exception e) {
            Log.error("error while validate email", e);
            throw new RuntimeException(e);
        }
    }


}