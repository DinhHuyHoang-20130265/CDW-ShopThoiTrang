package vn.edu.hcmuaf.cdw.ShopThoiTrang.entity;

import jakarta.persistence.*;
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
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;
    private String name;
    private String email;
    private String message;
    private boolean status;
    private Timestamp createdDate;

}
