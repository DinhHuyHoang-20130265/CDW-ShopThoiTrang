package vn.edu.hcmuaf.cdw.ShopThoiTrang.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "color")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Color {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private long id;
        private String color;
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

        @ManyToMany (fetch = FetchType.LAZY)
        @JoinTable(name = "product_color",
                joinColumns = @JoinColumn(name = "color_id"),
                inverseJoinColumns = @JoinColumn(name = "product_id"))
        private List<Product> products;
}
