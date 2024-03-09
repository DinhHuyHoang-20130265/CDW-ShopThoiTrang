package vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto;

import lombok.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Role;

import java.util.Collection;
import java.util.List;

@Data
@NonNull
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JwtResponse {
    private String token;
    private String refreshToken;
    private Long id;
    private String username;
    private String email;
    private List<String> authorities;
}
