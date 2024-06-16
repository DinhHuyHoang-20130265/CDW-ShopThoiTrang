package vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;
import java.util.Set;

@Data
@Builder
public class CreateOrderRequest {
    private Long id;
    private String name;
    private String phone;
    private String province;
    private String district;
    private String ward;
    private String address;
    private String note;
    private String coupon;
    private String status;
    private Double shippingFee;
    private String shippingCode;
    private Double totalAmount;
    private String paymentMethod;
    private String paymentStatus;
    private String paymentDate;
    private String paymentCode;
    private Long user_id;
    private Set<OrderDetailRequest> orderDetails;
}
