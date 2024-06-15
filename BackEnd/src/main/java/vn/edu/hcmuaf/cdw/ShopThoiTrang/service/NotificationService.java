package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;

import org.springframework.data.domain.Page;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Notification;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Order;

public interface NotificationService {
    Page<Notification> getAllNotifications(String filter, int page, int perPage, String sortBy, String order);

    Notification createNotification(String message, Long idResource, String resource);

    void readNotification(Long id);

    void markAllAsRead();

    void deleteAll();
}
