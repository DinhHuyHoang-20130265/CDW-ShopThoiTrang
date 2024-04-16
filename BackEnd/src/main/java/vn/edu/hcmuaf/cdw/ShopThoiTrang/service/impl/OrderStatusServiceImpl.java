package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

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

    @Autowired
    private OrderStatusRepository orderStatusRepository;

    @Override
    public List<OrderStatus> getAllOrderStatus() {
        return orderStatusRepository.findAll();
    }
}
