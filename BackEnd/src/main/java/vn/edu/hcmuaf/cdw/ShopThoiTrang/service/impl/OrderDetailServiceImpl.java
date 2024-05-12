package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.OrderDetail;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.OrderDetailRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.OrderDetailService;


@Service
public class OrderDetailServiceImpl implements OrderDetailService {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Override
    public void saveOrderDetail(OrderDetail orderDetail) {
        orderDetailRepository.save(orderDetail);
    }

    @Override
    public void updateOrderDetail(Long id, OrderDetail orderDetail) {
        OrderDetail orderDetail1 = orderDetailRepository.findById(id).get();
        orderDetail1.setOrder(orderDetail.getOrder());
        orderDetail1.setProductId(orderDetail.getProductId());
        orderDetail1.setSize(orderDetail.getSize());
        orderDetail1.setVariation(orderDetail.getVariation());
        orderDetail1.setQuantity(orderDetail.getQuantity());
        orderDetail1.setPrice(orderDetail.getPrice());
        orderDetailRepository.save(orderDetail1);
    }

    @Override
    public void deleteOrderDetail(Long id) {
        orderDetailRepository.deleteById(id);
    }
}
