package vn.edu.hcmuaf.cdw.ShopThoiTrang.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "log")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Log {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private long id;

    private String action;
    private String description;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Column(name = "ip_adress")
    private String ipAdress;

    @Column(name = "created_date")
    private String createdDate;

}
