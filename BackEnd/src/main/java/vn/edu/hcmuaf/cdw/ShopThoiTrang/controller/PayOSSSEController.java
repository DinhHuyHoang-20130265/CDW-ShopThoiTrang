package vn.edu.hcmuaf.cdw.ShopThoiTrang.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Webhook;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.WebhookRepository;

import java.time.Duration;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/payosse")
public class PayOSSSEController {
    @Autowired
    HttpServletRequest request;

    @Autowired
    WebhookRepository webhookRepository;

    @PreAuthorize("@securityService.isUser()")
    @GetMapping(path = "/{orderCode}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<String>> getEvents(@PathVariable String orderCode) {
        boolean[] hasData = {false}; // Use an array to allow modification inside the lambda
        ObjectMapper objectMapper = new ObjectMapper();
        return Flux.interval(Duration.ofSeconds(1)).flatMap(sequence -> {
            if (!hasData[0]) {
                Webhook webhook = webhookRepository.findByOrderCode(orderCode).orElse(null);
                if (webhook != null) {
                    hasData[0] = true;
                    try {
                        String webhookJson = objectMapper.writeValueAsString(webhook);
                        return Flux.just(ServerSentEvent.<String>builder()
                                .event("message")
                                .data(webhookJson)
                                .build());
                    } catch (JsonProcessingException e) {
                        return Flux.error(new RuntimeException(e));
                    }
                }
            }
            return Flux.empty();
        });

    }
}
