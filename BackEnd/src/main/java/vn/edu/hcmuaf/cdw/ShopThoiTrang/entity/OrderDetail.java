package vn.edu.hcmuaf.cdw.ShopThoiTrang.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "order_detail")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private Order order;

    @ManyToOne( fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    private Product productId;

    @ManyToOne( fetch = FetchType.EAGER)
    @JoinColumn(name = "variation_id")
    private Variation variation;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "size_id")
    private Size size;

    private int quantity;
    private double price;

    @OneToOne
    @JoinColumn(name = "review_id")
    private Review review;
}
