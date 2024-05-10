package vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Builder
public class PaymentResDTO implements Serializable {
    private String status;
    private String message;
    private String url;
}
