package vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto;

import lombok.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.*;

import java.sql.Date;
import java.util.List;
import java.util.Set;

@Data
@NonNull
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {

    private long id;

    private String username;

    private String passwordEncrypted;

    private boolean enabled;
    private UserInfo userInfo;

    private List<Review> reviews;

    private Set<Order> orders;


    private Role role;

    private List<ResourceVariation> resourceVariations;

    private Date createdDate;

    private Date updateDate;


    public UserDto(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.passwordEncrypted = user.getPasswordEncrypted();
        this.enabled = user.isEnabled();
        this.userInfo = user.getUserInfo();
        this.reviews = user.getReviews();
        this.orders = user.getOrders();
        this.role = user.getRole();
        this.resourceVariations = user.getResourceVariations();
        this.createdDate = user.getCreatedDate();
        this.updateDate = user.getUpdateDate();
    }
}
