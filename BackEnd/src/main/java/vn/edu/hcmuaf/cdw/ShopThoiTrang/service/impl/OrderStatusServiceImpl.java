package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Order;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.OrderStatus;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.OrderStatusRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.OrderService;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.OrderStatusService;

import java.util.List;

@Service
public class OrderStatusServiceImpl implements OrderStatusService {
    private static final Logger Log = Logger.getLogger(OrderStatusServiceImpl.class.getName());
    @Autowired
    private OrderStatusRepository orderStatusRepository;

    @Override
    public List<OrderStatus> getAllOrderStatus() {
        try {
            return orderStatusRepository.findAll();
        } catch (Exception e) {
            Log.error("Error get all order status", e);
            throw new RuntimeException(e);
        }
    }
}
