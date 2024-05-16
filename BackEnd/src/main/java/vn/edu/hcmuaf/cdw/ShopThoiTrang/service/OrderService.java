package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;

import org.springframework.data.domain.Page;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Order;

public interface OrderService {

    Page<Order> getAllOrders(String filter, int page, int perPage, String sortBy, String order);

    Order getOrderById(Long id);

    String createOrder(Order order);
}
