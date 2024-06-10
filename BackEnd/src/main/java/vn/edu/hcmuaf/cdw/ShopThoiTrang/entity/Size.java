package vn.edu.hcmuaf.cdw.ShopThoiTrang.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "size")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class Size {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull(message = "Size is required")
    private String size;

    @NotNull(message = "Stock is required")
    private int stock;

    @NotNull(message = "Status is required")
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
    @JoinColumn(name = "variation_id")
    private Variation variation;

    @JsonBackReference
    @OneToMany(mappedBy = "size", fetch = FetchType.EAGER , cascade = CascadeType.ALL)
    private List<ImportInvoiceDetail> importInvoiceDetails;

    @JsonIgnore
    @OneToMany(mappedBy = "size", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<OrderDetail> orderDetails;
}
