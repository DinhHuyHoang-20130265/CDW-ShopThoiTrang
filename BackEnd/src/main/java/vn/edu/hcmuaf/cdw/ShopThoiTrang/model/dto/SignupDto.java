package vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto;

import lombok.*;

@Data
@NonNull
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignupDto {
    private String username;
    private String fullName;
    private String password;
    private String email;
    private String otp;
}
