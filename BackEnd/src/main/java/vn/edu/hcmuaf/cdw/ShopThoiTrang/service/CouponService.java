package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Coupon;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Order;

import java.util.List;

public interface CouponService {
    Page<Coupon> getAllCoupons(String filter, int page, int perPage, String sortBy, String order);

    List<Coupon> getCouponStatusTrue();

    Coupon getCouponById(Long id);

    Coupon saveCoupon(Coupon coupon, HttpServletRequest request);

    Coupon updateCoupon(Long id, Coupon coupon, HttpServletRequest request);

    List<Order> getOrdersByCouponId(Long id);

    Coupon getCouponByCode(String code);
}
