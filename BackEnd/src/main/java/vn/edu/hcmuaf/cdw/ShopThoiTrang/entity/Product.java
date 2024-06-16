package vn.edu.hcmuaf.cdw.ShopThoiTrang.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "product")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull(message = "Product name is required")
    private String name;

    @NotNull(message = "Product description is required")
    private String description;

    @NotNull(message = "Product content is required")
    private String content;

    @NotNull(message = "Product status is required")
    private boolean status;

    @NotNull(message = "Product img_url is required")
    @Column(name = "img_url")
    private String imageUrl;

    @Column(name = "released_date")
    private Date releaseDate;

    @NotNull(message = "Deleted status is required")
    @Column(name = "deleted")
    private boolean deleted;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "released_by")
    private User releaseBy;

    @Column(name = "updated_date")
    private Date updateDate;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "updated_by")
    private User updateBy;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "product")
    private Price price;


    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "product_categories",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "cate_id"))
    private List<Category> categories;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<Variation> variations;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<ImageProduct> imgProducts;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "product_promotion",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "promotion_id"))
    private List<Promotion> promotions;

    @JsonBackReference
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ImportInvoiceDetail> importInvoiceDetails;

    @JsonIgnore
    @OneToMany(mappedBy = "productId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderDetail> orderDetails;

    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Review> reviews;


}
