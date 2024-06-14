package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.criteria.Predicate;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.JWT.JwtUtils;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Coupon;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Order;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.CouponRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.UserRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.CouponService;

import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.util.List;

@Service
public class CouponServiceImpl implements CouponService {
    private static final Logger Log = Logger.getLogger(PromotionServiceImpl.class.getName());
    @Autowired
    private CouponRepository couponRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Page<Coupon> getAllCoupons(String filter, int page, int perPage, String sortBy, String order) {
        try {
            Sort.Direction direction = Sort.Direction.ASC;
            if (order.equalsIgnoreCase("DESC"))
                direction = Sort.Direction.DESC;

            JsonNode filterJson;
            try {
                filterJson = new ObjectMapper().readTree(java.net.URLDecoder.decode(filter, StandardCharsets.UTF_8));
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
            Specification<Coupon> specification = (root, query, criteriaBuilder) -> {
                Predicate predicate = criteriaBuilder.conjunction();
                if (filterJson.has("q")) {
                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("name"), "%" + filterJson.get("q").asText() + "%"));
                }
                if (filterJson.has("status")) {
                    System.out.println(filterJson.get("status").asBoolean());
                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("status"), filterJson.get("status").asBoolean()));
                }
                if (filterJson.has("expired")) {
                    boolean expired = filterJson.get("expired").asBoolean();
                    if (expired) {
                        predicate = criteriaBuilder.and(predicate, criteriaBuilder.lessThanOrEqualTo(root.get("expiredDate"), new Date(System.currentTimeMillis())));
                    } else {
                        predicate = criteriaBuilder.and(predicate, criteriaBuilder.greaterThan(root.get("expiredDate"), new Date(System.currentTimeMillis())));
                    }
                }
                return predicate;
            };

            return switch (sortBy) {
                case "name" ->
                        couponRepository.findAll(specification, PageRequest.of(page, perPage == -1 ? Integer.MAX_VALUE : perPage, Sort.by(direction, "name")));
                case "status" ->
                        couponRepository.findAll(specification, PageRequest.of(page, perPage == -1 ? Integer.MAX_VALUE : perPage, Sort.by(direction, "status")));
                default ->
                        couponRepository.findAll(specification, PageRequest.of(page, perPage == -1 ? Integer.MAX_VALUE : perPage, Sort.by(direction, sortBy)));
            };
        } catch (RuntimeException e) {
            Log.error("Error while getting all coupons", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Coupon> getCouponStatusTrue() {
        return List.of();
    }

    @Override
    public Coupon getCouponById(Long id) {
        try {
            return couponRepository.findById(id).orElse(null);
        } catch (Exception e) {
            Log.error("Error while getting coupon by id", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public Coupon saveCoupon(Coupon coupon, HttpServletRequest request) {
        String jwt = jwtUtils.getJwtFromCookies(request, "shop2h_admin");
        coupon.setCreateBy(userRepository.findByUsername(jwtUtils.getUserNameFromJwtToken(jwt)).orElse(null));
        coupon.setUpdateBy(userRepository.findByUsername(jwtUtils.getUserNameFromJwtToken(jwt)).orElse(null));
        try {
            Date date = new Date(System.currentTimeMillis());
            coupon.setCreateDate(date);
            coupon.setUpdateDate(date);

            Log.info(coupon.getCreateBy().getUsername() + " created coupon " + coupon.getName());
            return couponRepository.save(coupon);
        } catch (Exception e) {
            Log.error("Error while saving coupon", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public Coupon updateCoupon(Long id, Coupon coupon, HttpServletRequest request) {
        String jwt = jwtUtils.getJwtFromCookies(request, "shop2h_admin");
        coupon.setUpdateBy(userRepository.findByUsername(jwtUtils.getUserNameFromJwtToken(jwt)).orElse(null));
        try {
            Coupon existingCoupon = couponRepository.findById(id).orElse(null);
            if (existingCoupon == null) {
                return null;
            }
            existingCoupon.setName(coupon.getName());
            existingCoupon.setPrice(coupon.getPrice());
            existingCoupon.setStatus(coupon.isStatus());
            existingCoupon.setQuantity(coupon.getQuantity());
            existingCoupon.setExpiredDate(coupon.getExpiredDate());
            existingCoupon.setUpdateDate(new Date(System.currentTimeMillis()));
            existingCoupon.setUpdateBy(coupon.getUpdateBy());


            Log.info(coupon.getUpdateBy().getUsername() + " updated coupon " + coupon.getName());
            return couponRepository.save(existingCoupon);
        } catch (Exception e) {
            Log.error("Error while updating coupon", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Order> getOrdersByCouponId(Long id) {
        try {
            return couponRepository.findById(id).orElse(null).getOrders();
        } catch (Exception e) {
            Log.error("Error while getting products by promotion id", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public Coupon getCouponByCode(String code) {
        return couponRepository.findByCouponCode(code).orElse(null);
    }
}
