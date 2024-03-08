package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.User;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.LoginDto;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.SignupDto;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.UserRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.AuthService;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.EmailService;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    private final Map<String, String> otpMap = new HashMap<>();
    @Override
    public ResponseEntity<?> login(LoginDto loginDto) {
        if (userRepository.existsByUsername(loginDto.getEmail())) {
            User user = userRepository.findByName(loginDto.getFullName());
            if (user.isEnabled()) {
                LoginDto response = new LoginDto();
                response.setId(user.getId());
                response.setEmail(user.getUserInfo().getEmail());
                response.setFullName(user.getUserInfo().getFullName());
                response.setAdmin(true);
                response.setPassword(loginDto.getPassword());
                if (passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
                    return new ResponseEntity<>(response, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("Password incorrect", HttpStatus.BAD_REQUEST);
                }
            } else {
                return new ResponseEntity<>("Account is locked", HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>("Email not found", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseEntity<?> signup(SignupDto signupDto) {
        if (userRepository.existsByEmail(signupDto.getEmail())) {
            return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
        }
        String otp = generateOTP();
        otpMap.put(signupDto.getEmail(), otp);
        System.out.println(otpMap);

        scheduleOTPCleanup(signupDto.getEmail());
        System.out.println(otpMap);

        emailService.sendResetPasswordEmail(signupDto.getEmail(), otp, "OTP for registration");

        return new ResponseEntity<>("OTP has sent to email", HttpStatus.OK);
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
        if (otpMap.isEmpty() ||!isOTPValid(signupDto.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("OTP has expired.");
        }

        if ( !otpMap.get(signupDto.getEmail()).equals(signupDto.getOtp())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid OTP.");
        }

        User user = new User();
        user.getUserInfo().setEmail(signupDto.getEmail());
        user.getUserInfo().setFullName(signupDto.getFullName());
        user.setPasswordEncrypted(passwordEncoder.encode(signupDto.getPassword()));
        user.setEnabled(true);
        userRepository.save(user);


        otpMap.remove(signupDto.getEmail());
        return ResponseEntity.ok("Signup successful.");
    }


}