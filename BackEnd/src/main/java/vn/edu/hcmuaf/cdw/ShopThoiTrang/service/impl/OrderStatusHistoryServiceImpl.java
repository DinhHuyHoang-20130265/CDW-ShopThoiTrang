package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.OrderStatusHistory;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.OrderStatusHistoryRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.OrderStatusHistoryService;

@Service
public class OrderStatusHistoryServiceImpl implements OrderStatusHistoryService {
    private static final Logger Log = Logger.getLogger(OrderStatusHistoryServiceImpl.class.getName());
    @Autowired
    private OrderStatusHistoryRepository orderStatusHistoryRepository;

    @Override
    public void saveOrderStatusHistory(OrderStatusHistory orderStatusHistory) {
        try {
            orderStatusHistoryRepository.save(orderStatusHistory);
        } catch (Exception e) {
            Log.error("Error save order status history", e);
            throw new RuntimeException(e);
        }
    }
}
