package vn.edu.hcmuaf.cdw.ShopThoiTrang.model.request;

import lombok.*;

@Data
@NonNull
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ImportInvoiceDetailRequest {
    private long importInvoice;
    private long product;
    private long variation;
    private long size;
    private int quantity;
    private Double importPrice;
}
