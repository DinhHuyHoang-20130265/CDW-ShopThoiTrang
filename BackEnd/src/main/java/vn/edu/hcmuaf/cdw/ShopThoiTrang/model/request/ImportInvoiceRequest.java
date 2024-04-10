package vn.edu.hcmuaf.cdw.ShopThoiTrang.model.request;


import lombok.*;

import java.sql.Date;

@Data
@NonNull
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ImportInvoiceRequest {

    private Date importDate;
    private long idProduct;
    private long idVariation;
    private long idSize;
    private int quantity;
    private double importPrice;
}
