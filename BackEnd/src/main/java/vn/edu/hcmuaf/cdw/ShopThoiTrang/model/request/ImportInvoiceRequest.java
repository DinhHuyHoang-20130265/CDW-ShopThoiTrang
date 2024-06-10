package vn.edu.hcmuaf.cdw.ShopThoiTrang.model.request;


import lombok.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.User;

import java.sql.Date;
import java.util.List;

@Data
@NonNull
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ImportInvoiceRequest {
    private Date importDate;
    private Double totalPrice;
    private User importBy;
    private List<ImportInvoiceDetailRequest> importInvoiceDetails;
}
