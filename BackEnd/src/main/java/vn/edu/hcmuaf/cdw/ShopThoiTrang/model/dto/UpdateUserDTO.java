package vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto;

import lombok.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.ResourceVariation;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Role;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.UserInfo;

import java.util.List;

@Data
@NonNull
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateUserDTO {
    private boolean enabled;
    private UserInfo userInfo;
    private String username;
    private String password;
    private Role role;
    private List<ResourceVariation> resourceVariations;
}
