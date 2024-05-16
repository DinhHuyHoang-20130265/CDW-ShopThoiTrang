package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;

import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.OrderDetail;

public interface OrderDetailService {

    void saveOrderDetail(OrderDetail orderDetail);

    void updateOrderDetail(Long id, OrderDetail orderDetail);

    void deleteOrderDetail(Long id);
}
