package vn.edu.hcmuaf.cdw.ShopThoiTrang.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "variation")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Variation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String color;

    @Column(name = "color_code")
    private String colorCode;
    private boolean status;

    @Column(name = "released_date")
    private Date releaseDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "released_by")
    private User releaseBy;

    @Column(name = "updated_date")
    private Date updateDate;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "updated_by")
    private User updateBy;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @OneToMany(mappedBy = "variation", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Size> sizes;

    @JsonIgnore
    @OneToMany(mappedBy = "variation", fetch = FetchType.EAGER , cascade = CascadeType.ALL)
    private List<ImportInvoice> importInvoices;

    @JsonIgnore
    @OneToMany(mappedBy = "variation", fetch = FetchType.LAZY , cascade = CascadeType.ALL)
    private List<OrderDetail> orderDetails;

}
