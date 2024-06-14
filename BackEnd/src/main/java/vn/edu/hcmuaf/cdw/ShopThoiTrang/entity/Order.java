package vn.edu.hcmuaf.cdw.ShopThoiTrang.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.sql.Timestamp;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Generated order id is required")
    private Long generated_order_id;

    @NotNull(message = "Name is required")
    private String name;

    @NotNull(message = "Phone is required")
    private String phone;

    @NotNull(message = "Province is required")
    private String province;

    @NotNull(message = "District is required")
    private String district;

    @NotNull(message = "Ward is required")
    private String ward;

    @NotNull(message = "Address is required")
    private String address;


    @NotNull(message = "Order date is required")
    @Column(name = "order_date")
    private Timestamp orderDate;
    private String note;

    @NotNull(message = "Order status is required")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "status_id")
    private OrderStatus status;


    @NotNull(message = "ShippingFee is required")
    @Column(name = "shipping_fee")
    private Double shippingFee;

    @NotNull(message = "Shipping status is required")
    @Column(name = "shipping_code")
    private String shippingCode;

    @NotNull(message = "Total is required")
    @Column(name = "total_amount")
    private Double totalAmount;

    @NotNull(message = "Payment method is required")
    @Column(name = "payment_method")
    private String paymentMethod;


    @NotNull(message = "Payment status is required")
    @Column(name = "payment_status")
    private String paymentStatus;

    @Column(name = "payment_date")
    private Timestamp paymentDate;

    @Column(name = "payment_code")
    private String paymentCode;

    @NotNull(message = "User is required")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "coupon_id")
    private Coupon coupon;

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<OrderDetail> orderDetails;

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @OrderBy("createdDate DESC")
    private Set<OrderStatusHistory> orderStatusHistories;
}
