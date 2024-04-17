package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.OrderRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.OrderService;

import java.nio.charset.StandardCharsets;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;


    @Override
    public Page<Order> getAllOrders(String filter, int page, int perPage, String sortBy, String order) {
        Sort.Direction direction = Sort.Direction.ASC;
        if (order.equalsIgnoreCase("DESC"))
            direction = Sort.Direction.DESC;

        JsonNode filterJson;
        try {
            filterJson = new ObjectMapper().readTree(java.net.URLDecoder.decode(filter, StandardCharsets.UTF_8));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        Specification<Order> specification = (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();
            if (filterJson.has("q")) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("name"), "%" + filterJson.get("q").asText().toLowerCase() + "%"));
            }
            if (filterJson.has("price_lt") || filterJson.has("price_gt")) {
                double priceLt = filterJson.has("price_lt") ? filterJson.get("price_lt").asDouble() : Double.MAX_VALUE;
                double priceGt = filterJson.has("price_gt") ? filterJson.get("price_gt").asDouble() : 0;
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.between(root.get("totalAmount"), priceGt, priceLt));
            }
            if (filterJson.has("statusId")) {
                Join<Order, OrderStatus> statusJoin = root.join("status");
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(statusJoin.get("id"), filterJson.get("statusId").asLong()));
            }
            return predicate;
        };

        if (sortBy.equals("price")) {
            return orderRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, "totalAmount")));
        }

        return orderRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, sortBy)));
    }

    @Override
    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }
}