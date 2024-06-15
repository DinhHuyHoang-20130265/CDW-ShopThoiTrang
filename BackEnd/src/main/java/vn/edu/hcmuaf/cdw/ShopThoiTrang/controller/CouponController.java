package vn.edu.hcmuaf.cdw.ShopThoiTrang.controller;

import jakarta.annotation.security.PermitAll;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Coupon;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.CouponService;

@RestController
@RequestMapping("/api/coupon")
public class CouponController {

    @Autowired
    HttpServletRequest request;

    @Autowired
    private CouponService couponService;

    @GetMapping()
    public ResponseEntity<?> getAllCoupon(@RequestParam(defaultValue = "0") int page,
                                          @RequestParam(defaultValue = "{}") String filter,
                                          @RequestParam(defaultValue = "25") int perPage,
                                          @RequestParam(defaultValue = "name") String sort,
                                          @RequestParam(defaultValue = "DESC") String order) {
        return ResponseEntity.ok(couponService.getAllCoupons(filter, page, perPage, sort, order));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or @securityService.isSuperAdmin()")
    @GetMapping("/{id}")
    public ResponseEntity<?> getCouponById(@PathVariable Long id) {
        return ResponseEntity.ok(couponService.getCouponById(id));
    }

    @GetMapping("/check/{code}")
    public ResponseEntity<?> getCouponByName(@PathVariable String code) {
        return ResponseEntity.ok(couponService.getCouponByCode(code));
    }

    @PreAuthorize("(hasAuthority('ROLE_ADMIN') and hasAuthority('COUPON_CREATE')) or @securityService.isSuperAdmin()")
    @PostMapping
    public ResponseEntity<?> saveCoupon(@RequestBody Coupon coupon) {
        return ResponseEntity.ok(couponService.saveCoupon(coupon, request));
    }

    @PreAuthorize("(hasAuthority('ROLE_ADMIN') and hasAuthority('COUPON_UPDATE')) or @securityService.isSuperAdmin()")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCoupon(@PathVariable Long id, @RequestBody Coupon coupon) {
        return ResponseEntity.ok(couponService.updateCoupon(id, coupon, request));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or @securityService.isSuperAdmin()")
    @GetMapping("/orders/{id}")
    public ResponseEntity<?> getOrdersByCouponId(@PathVariable Long id) {
        return ResponseEntity.ok(couponService.getOrdersByCouponId(id));
    }

    @PreAuthorize("(hasAuthority('ROLE_ADMIN') and hasAuthority('COUPON_DELETE')) or @securityService.isSuperAdmin()")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCoupon(@PathVariable Long id) {
        return ResponseEntity.ok(couponService.deleteCoupon(id, request));
    }
}
