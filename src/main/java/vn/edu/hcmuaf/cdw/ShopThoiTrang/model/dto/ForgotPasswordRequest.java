package vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ForgotPasswordRequest {
    private String email;
    private String otp;
    private String newPassword;
}
