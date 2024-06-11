package vn.edu.hcmuaf.cdw.ShopThoiTrang.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.sql.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "promotion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Promotion {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private long id;

    @NotNull(message = "Name is required")
    private String name;

    @NotNull(message = "Description is required")
    private String description;

    @NotNull(message = "Discount is required")
    private int discount;

    @NotNull(message = "Status is required")
    private boolean status;

    @NotNull(message = "Thumbnail is required")
    private String thumbnail;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "created_date")
    private Date createdDate;

    @Column(name = "updated_date")
    private Date updatedDate;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", referencedColumnName = "id")
    private User createdBy;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "updated_by", referencedColumnName = "id")
    private User updatedBy;

    @JsonBackReference
    @ManyToMany(mappedBy = "promotions", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Product> products;
}
