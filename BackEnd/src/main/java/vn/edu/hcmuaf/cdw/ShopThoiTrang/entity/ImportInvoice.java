package vn.edu.hcmuaf.cdw.ShopThoiTrang.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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

    @NotNull(message = "Nhập số lượng")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    private Product product;

    @NotNull(message = "Nhập màu sắc")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "variation_id")
    private Variation variation;

    @NotNull(message = "Nhập kích thước")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "size_id")
    private Size size;

    @NotNull(message = "Nhập số lượng")
    private int quantity;

    @NotNull(message = "Nhập giá nhập")
    @Column(name = "import_price")
    private Double importPrice;

}
