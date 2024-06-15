package vn.edu.hcmuaf.cdw.ShopThoiTrang.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.NotificationService;

@RestController
@RequestMapping("/api/notification")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping
    public ResponseEntity<?> getAllNotifications(@RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "{}") String filter,
                                                 @RequestParam(defaultValue = "25") int perPage,
                                                 @RequestParam(defaultValue = "createdAt") String sort,
                                                 @RequestParam(defaultValue = "DESC") String order) {
        return ResponseEntity.ok(notificationService.getAllNotifications(filter, page, perPage, sort, order));
    }

    @PutMapping("/read/{id}")
    public ResponseEntity<?> readNotification(@PathVariable Long id) {
        notificationService.readNotification(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/read-all")
    public ResponseEntity<?> markAllAsRead() {
        notificationService.markAllAsRead();
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete-all")
    public ResponseEntity<?> deleteAll() {
        notificationService.deleteAll();
        return ResponseEntity.ok().build();
    }
}
