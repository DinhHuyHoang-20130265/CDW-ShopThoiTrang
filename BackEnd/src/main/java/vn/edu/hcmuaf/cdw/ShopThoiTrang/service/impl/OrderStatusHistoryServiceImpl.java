package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.OrderStatusHistory;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.OrderStatusHistoryRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.OrderStatusHistoryService;

@Service
public class OrderStatusHistoryServiceImpl implements OrderStatusHistoryService {

    @Autowired
    private OrderStatusHistoryRepository orderStatusHistoryRepository;

    @Override
    public void saveOrderStatusHistory(OrderStatusHistory orderStatusHistory) {
        orderStatusHistoryRepository.save(orderStatusHistory);
    }
}
