package vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto;

import lombok.*;
import java.util.List;

@Data
@NonNull
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JwtResponse {
    private Long id;
    private String username;
    private List<String> authorities;
}
