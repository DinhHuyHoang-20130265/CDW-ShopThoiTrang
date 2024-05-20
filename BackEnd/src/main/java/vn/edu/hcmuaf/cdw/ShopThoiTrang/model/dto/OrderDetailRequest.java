package vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderDetailRequest {
    private Long id;
    private Double price;
    private Long productId;
    private Long variationId;
    private Long sizesId;
    private Integer quantity;
}
