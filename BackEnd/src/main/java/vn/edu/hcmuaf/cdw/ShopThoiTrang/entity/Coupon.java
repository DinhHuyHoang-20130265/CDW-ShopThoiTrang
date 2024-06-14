package vn.edu.hcmuaf.cdw.ShopThoiTrang.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;


import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "coupons")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NotNull(message = "Name is required")
    private String name;
    @NotNull(message = "Price is required")
    private Double price;
    @NotNull(message = "Code is required")
    @Column(unique = true, name = "coupon_code")
    @Size(min = 6, max = 10, message = "Code must be 6 characters")
    private String couponCode;

    @NotNull(message = "Status is required")
    private boolean status;

    @NotNull(message = "Quantity is required")
    private int quantity;

    @NotNull(message = "Expired date is required")
    @Column(name = "expired_date")
    private Date expiredDate;

    @Column(name = "created_date")
    private Date createDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createBy;

    @Column(name = "updated_date")
    private Date updateDate;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "updated_by")
    private User updateBy;

    @JsonBackReference
    @OneToMany(mappedBy = "coupon", cascade = CascadeType.ALL)
    private List<Order> orders;

}
