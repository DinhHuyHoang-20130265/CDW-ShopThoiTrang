package vn.edu.hcmuaf.cdw.ShopThoiTrang.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

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
    private Date importDate;

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
