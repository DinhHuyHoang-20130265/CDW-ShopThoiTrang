package vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto;

import lombok.*;

@Data
@NonNull
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GoogleAccountDto {
    private String firstName;
    private String lastName;
    private String email;
    private String pictureUrl;
}
