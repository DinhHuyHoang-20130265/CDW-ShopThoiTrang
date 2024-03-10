package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.User;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.UserInfo;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.ForgotPasswordRequest;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.UserInfoRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.UserRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.EmailService;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.UserService;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private EmailService emailService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserInfoRepository userInfoRepository;
    private final Map<String, String> otpMap = new HashMap<>();
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User getUserById(Long id) {
        return userRepository.getReferenceById(id);
    }

    @Override
    public ResponseEntity<?> forgotPassword(ForgotPasswordRequest forgotPasswordRequest) {
        if (userInfoRepository.existsByEmail(forgotPasswordRequest.getEmail())) {
            String otp = generateOTP();
            otpMap.put(forgotPasswordRequest.getEmail(), otp);

            scheduleOTPCleanup(forgotPasswordRequest.getEmail());
            System.out.println(otpMap);

            emailService.sendResetPasswordEmail(forgotPasswordRequest.getEmail(), otp, "Reset password");
            return new ResponseEntity<>("OTP for forgot password has sent to your email", HttpStatus.OK);
        }
        return new ResponseEntity<>("Email doesn't Exits", HttpStatus.NOT_FOUND);
    }

    @Override
    public ResponseEntity<?> forgotPasswordConfirmation(ForgotPasswordRequest forgotPasswordRequest) {
        if (otpMap.isEmpty() || !isOTPValid(forgotPasswordRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("OTP has expired.");
        }

        if (!otpMap.get(forgotPasswordRequest.getEmail()).equals(forgotPasswordRequest.getOtp())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid OTP.");
        }
        User user = userInfoRepository.findByEmail(forgotPasswordRequest.getEmail()).getUser();
        user.setPasswordEncrypted(passwordEncoder.encode(forgotPasswordRequest.getNewPassword()));
        userRepository.save(user);

        otpMap.remove(forgotPasswordRequest.getEmail());
        return ResponseEntity.ok("Password changed successful.");
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
}
