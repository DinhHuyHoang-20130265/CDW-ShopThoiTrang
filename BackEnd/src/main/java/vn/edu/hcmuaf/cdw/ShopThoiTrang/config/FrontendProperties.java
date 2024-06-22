package vn.edu.hcmuaf.cdw.ShopThoiTrang.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Setter
@Getter
@Component
@ConfigurationProperties(prefix = "frontend")
public class FrontendProperties {
    // Getters and setters
    private String url;
    private String admin;

}
