package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;


import org.springframework.http.ResponseEntity;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.User;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.ForgotPasswordRequest;

public interface UserService {
    User getUserById(Long id);

    ResponseEntity<?> forgotPassword(ForgotPasswordRequest forgotPasswordRequest);

    ResponseEntity<?> forgotPasswordConfirmation(ForgotPasswordRequest forgotPasswordRequest);
}
