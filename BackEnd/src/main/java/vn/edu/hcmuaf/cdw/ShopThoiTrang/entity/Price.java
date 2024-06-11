package vn.edu.hcmuaf.cdw.ShopThoiTrang.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.sql.Date;

@Entity
@Table(name = "price")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"product"})
public class Price {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull(message = "Product is required")
    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id")
    private Product product;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", message = "Price must be greater than 0")
    private double price;

    @Column(name = "updated_date")
    private Date updatedDate;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "updated_by")
    private User updateBy;
}
