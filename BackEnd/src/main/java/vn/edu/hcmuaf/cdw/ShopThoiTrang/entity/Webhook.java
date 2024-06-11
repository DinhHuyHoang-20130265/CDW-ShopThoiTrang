package vn.edu.hcmuaf.cdw.ShopThoiTrang.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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

    @NotNull(message = "Webhook code is required")
    private String code;

    @NotNull(message = "Webhook orderCode is required")
    private String orderCode;

    @NotNull(message = "Webhook orderCode is required")
    private boolean success;

    @NotNull(message = "Webhook cancel is required")
    private boolean cancel;

    @NotNull(message = "Webhook status is required")
    private String status;

    private String signature;

}
