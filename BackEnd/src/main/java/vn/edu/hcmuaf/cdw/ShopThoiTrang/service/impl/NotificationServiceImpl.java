package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.criteria.Predicate;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Notification;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.NotificationRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.NotificationService;

import java.nio.charset.StandardCharsets;
import java.sql.Timestamp;
import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    private static final Logger LOG = Logger.getLogger(NotificationServiceImpl.class.getName());

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public Page<Notification> getAllNotifications(String filter, int page, int perPage, String sortBy, String order) {
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
            Specification<Notification> specification = (root, query, criteriaBuilder) -> {
                Predicate predicate = criteriaBuilder.conjunction();
                if (filterJson.has("isRead")) {
                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("isRead"), filterJson.get("isRead").asBoolean()));
                }
                return predicate;
            };

            if (sortBy.equals("createdAt")) {
                return notificationRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, sortBy)));
            }

            return notificationRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, sortBy)));
        } catch (RuntimeException e) {
            LOG.error("Error while getting all notifications: ", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public Notification createNotification(String message, Long idResource, String resource) {
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        Notification notification = new Notification();
        notification.setMessage(message);
        notification.setIdResource(idResource);
        notification.setResource(resource);
        notification.setRead(false);
        notification.setCreatedAt(timestamp);
        return notificationRepository.save(notification);
    }

    @Override
    public void readNotification(Long id) {
        Notification notification = notificationRepository.findById(id).orElseThrow(() -> new RuntimeException("Notification not found"));
        notification.setRead(true);
        notificationRepository.save(notification);
    }

    @Override
    public void markAllAsRead() {
        List<Notification> notifications = notificationRepository.findAll();
        notifications.forEach(notification -> {
            notification.setRead(true);
            notificationRepository.save(notification);
        });
    }

    @Override
    public void deleteAll() {
        notificationRepository.deleteAll();
    }
}
