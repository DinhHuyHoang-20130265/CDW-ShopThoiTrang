package vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto;

import lombok.Builder;
import lombok.Data;
import java.sql.Timestamp;
import java.util.Set;

@Data
@Builder
public class CreateOrderRequest {
    private String name;
    private String phone;
    private String province;
    private String district;
    private String ward;
    private String address;
    private String note;
    private Double shippingFee;
    private String shippingCode;
    private Double totalAmount;
    private String paymentMethod;
    private String paymentStatus;
    private Timestamp paymentDate;
    private String paymentCode;
    private Long userId;
    private Set<OrderDetailRequest> orderDetails;
}
