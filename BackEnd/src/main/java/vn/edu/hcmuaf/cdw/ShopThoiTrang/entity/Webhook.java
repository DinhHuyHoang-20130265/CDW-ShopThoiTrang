package vn.edu.hcmuaf.cdw.ShopThoiTrang.entity;


import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "webhook")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Webhook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;
    private String orderCode;
    private boolean success;
    private boolean cancel;
    private String status;
    private String signature;

}
