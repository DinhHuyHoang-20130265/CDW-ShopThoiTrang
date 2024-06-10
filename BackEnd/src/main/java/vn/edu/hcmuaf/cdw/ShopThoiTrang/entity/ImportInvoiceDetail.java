package vn.edu.hcmuaf.cdw.ShopThoiTrang.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
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
    private ImportInvoice importInvoice;

    @ManyToOne(fetch = FetchType.EAGER )
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER )
    @JoinColumn(name = "variation_id")
    private Variation variation;

    @ManyToOne(fetch = FetchType.EAGER )
    @JoinColumn(name = "size_id")
    private Size size;

    private int quantity;

    @Column(name = "import_price")
    private Double importPrice;
}
