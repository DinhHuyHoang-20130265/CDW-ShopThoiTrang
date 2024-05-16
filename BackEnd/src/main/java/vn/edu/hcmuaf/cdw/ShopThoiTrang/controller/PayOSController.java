package vn.edu.hcmuaf.cdw.ShopThoiTrang.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Webhook;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.WebhookRepository;

import java.net.URI;
import java.util.LinkedHashMap;

@RequestMapping("/api/payos")
@RestController
public class PayOSController {
    @Autowired
    WebhookRepository webhookRepository;

    @PostMapping
    public ResponseEntity<String> payOSPOST(@RequestBody Object object) {
        System.out.println(object.toString());
        LinkedHashMap<String, Object> map;
        map = (LinkedHashMap<String, Object>) object;
        if (!map.containsKey("success")) {
            return ResponseEntity.ok().body("PayOS");
        }
        Webhook webhook = new Webhook();
        webhook.setCode((String) map.get("code"));
        LinkedHashMap<String, Object> data = (LinkedHashMap<String, Object>) map.get("data");
        webhook.setOrderCode("" + data.get("orderCode"));
        webhook.setSuccess((Boolean) map.get("success"));
        webhook.setCancel(false);
        webhookRepository.save(webhook);
        return ResponseEntity.ok().body("<script>window.close();</script>");
    }

    @GetMapping
    public ResponseEntity<String> payOSGGET(
            @RequestParam String code,
            @RequestParam boolean cancel,
            @RequestParam String status,
            @RequestParam String orderCode

    ) {
        Webhook webhook = new Webhook();
        webhook.setCode(code);
        webhook.setOrderCode(orderCode);
        webhook.setSuccess(false);
        webhook.setCancel(cancel);
        webhook.setStatus(status);
        webhookRepository.save(webhook);
        return ResponseEntity.ok().body("<script>window.close();</script>");
    }
}
