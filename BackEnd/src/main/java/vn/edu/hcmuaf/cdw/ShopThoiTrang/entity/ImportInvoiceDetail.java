package vn.edu.hcmuaf.cdw.ShopThoiTrang.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "import_invoice_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ImportInvoiceDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.EAGER )
    @JoinColumn(name = "import_invoice_id")
    @NotNull(message = "Import Invoice is required")
    private ImportInvoice importInvoice;

    @NotNull(message = "Product is required")
    @ManyToOne(fetch = FetchType.EAGER )
    @JoinColumn(name = "product_id")
    private Product product;

    @NotNull(message = "Variation is required")
    @ManyToOne(fetch = FetchType.EAGER )
    @JoinColumn(name = "variation_id")
    private Variation variation;

    @NotNull(message = "Size is required")
    @ManyToOne(fetch = FetchType.EAGER )
    @JoinColumn(name = "size_id")
    private Size size;

    @NotNull(message = "Quantity is required")
    private int quantity;

    @NotNull(message = "Import Price is required")
    @Column(name = "import_price")
    private Double importPrice;
}
