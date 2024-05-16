package vn.edu.hcmuaf.cdw.ShopThoiTrang.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PayOSData {
    @JsonProperty("accountNumber")
    private String accountNumber;
    @JsonProperty("amount")
    private int amount;
    @JsonProperty("description")
    private String description;
    @JsonProperty("reference")
    private String reference;
    @JsonProperty("transactionDateTime")
    private String transactionDateTime;
    @JsonProperty("virtualAccountNumber")
    private String virtualAccountNumber;
    @JsonProperty("counterAccountBankId")
    private String counterAccountBankId;
    @JsonProperty("counterAccountBankName")
    private String counterAccountBankName;
    @JsonProperty("counterAccountName")
    private String counterAccountName;
    @JsonProperty("counterAccountNumber")
    private String counterAccountNumber;
    @JsonProperty("virtualAccountName")
    private String virtualAccountName;
    @JsonProperty("currency")
    private String currency;
    @JsonProperty("orderCode")
    private String orderCode;
    @JsonProperty("paymentLinkId")
    private String paymentLinkId;
    @JsonProperty("code")
    private String code;
    @JsonProperty("desc")
    private String desc;
}
