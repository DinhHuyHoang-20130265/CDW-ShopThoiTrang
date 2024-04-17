package vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Product;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Promotion;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.User;

import java.sql.Date;
import java.util.List;

@Data
@NonNull
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PromotionDto {

    private long id;

    private String name;

    private String description;

    private int discount;

    private boolean status;

    private String thumbnail;

    private Date startDate;

    private Date endDate;

    private Date createdDate;

    private Date updatedDate;

    private User createdBy;

    private User updatedBy;

    private List<Product> products;

    public static PromotionDto from(Promotion promotion) {
        return PromotionDto.builder()
                .id(promotion.getId())
                .name(promotion.getName())
                .description(promotion.getDescription())
                .discount(promotion.getDiscount())
                .status(promotion.isStatus())
                .thumbnail(promotion.getThumbnail())
                .startDate(promotion.getStartDate())
                .endDate(promotion.getEndDate())
                .createdDate(promotion.getCreatedDate())
                .updatedDate(promotion.getUpdatedDate())
                .createdBy(promotion.getCreatedBy())
                .updatedBy(promotion.getUpdatedBy())
                .products(promotion.getProducts())
                .build();
    }
}

