package vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Webhook;

import java.util.Optional;

public interface WebhookRepository extends JpaRepository<Webhook, Long> {
    Optional<Webhook> findByOrderCode(String orderCode);
}
