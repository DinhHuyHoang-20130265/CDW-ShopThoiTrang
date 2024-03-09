package vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto;

import lombok.*;

import java.util.List;

@Data
@NonNull
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JwtRefreshResponse {
    private String accessToken;
    private String refreshToken;
    private String tokenType = "Bearer";

}
