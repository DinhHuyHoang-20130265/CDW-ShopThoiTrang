package vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto;

import lombok.*;

@Data
@NonNull
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginDto {
    private String username;
    private String password;
}