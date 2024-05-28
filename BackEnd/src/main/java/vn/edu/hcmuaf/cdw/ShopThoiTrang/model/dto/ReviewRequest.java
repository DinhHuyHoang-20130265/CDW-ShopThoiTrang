package vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReviewRequest {
    private String content;
    private int rating;

    private Long product;

    private Long reviewer;

    private Long orderDetail;
}
