package vn.edu.hcmuaf.cdw.ShopThoiTrang.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "import_invoices")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ImportInvoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "import_date")
    private String importDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "variation_id")
    private Variation variation;


    private int quantity;

    @Column(name = "import_price")
    private double importPrice;




}
