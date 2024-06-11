package vn.edu.hcmuaf.cdw.ShopThoiTrang.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Table(name = "contact")
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull(message = "Name is required")
    @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
    private String name;

    @NotNull(message = "Email is required")
    @Size(min = 3, max = 50, message = "Email must be between 3 and 50 characters")
    private String email;

    @NotNull(message = "Message is required")
    @Size(min = 3, max = 500, message = "Message must be between 3 and 500 characters")
    private String message;
    @NotNull(message = "Status is required")
    private boolean status;
    private Timestamp createdDate;

}
