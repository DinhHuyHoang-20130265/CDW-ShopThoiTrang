package vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BlogDto {
    private long id;
    private String title;
    private String description;
    private String content;
    private boolean status;
    private String thumbnail;
    private Date updateDate;
    private String updateBy;
}
