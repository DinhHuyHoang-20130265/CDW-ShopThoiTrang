package vn.edu.hcmuaf.cdw.ShopThoiTrang.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Contact;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Notification;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.ContactService;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.NotificationService;

import java.util.LinkedHashMap;

@RestController
@RequestMapping("/api/contact")
public class ContactController {
    @Autowired
    private ContactService contactService;

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or @securityService.isSuperAdmin()")
    @GetMapping
    public ResponseEntity<Page<Contact>> getAllContact(@RequestParam(defaultValue = "0") int start,
                                                       @RequestParam(defaultValue = "{}") String filter,
                                                       @RequestParam(defaultValue = "25") int end,
                                                       @RequestParam(defaultValue = "name") String sort,
                                                       @RequestParam(defaultValue = "DESC") String order) {
        Page<Contact> contacts = contactService.getAllContact(filter, start, end, sort, order);
        return ResponseEntity.ok(contacts);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or @securityService.isSuperAdmin()")
    @GetMapping("/{id}")
    public ResponseEntity<?> getContactById(@PathVariable Long id) {
        return ResponseEntity.ok(contactService.getContactById(id));
    }

    @PreAuthorize("@securityService.isUser()")
    @PostMapping
    public ResponseEntity<?> saveContact(@RequestParam String name, @RequestParam String email, @RequestParam String message) {
        Contact contact = contactService.saveContact(name, email, message);
        if (contact != null) {
            Notification notification = notificationService.createNotification("New contact has been created", contact.getId(), "contact");
            messagingTemplate.convertAndSend("/topic/notifications", notification);
        }
        return ResponseEntity.ok("Success");
    }

    @PreAuthorize("(hasAuthority('ROLE_ADMIN') and hasAuthority('CONTACT_UPDATE')) or @securityService.isSuperAdmin()")
    @PutMapping("/{id}")
    public ResponseEntity<?> replyContact(@PathVariable Long id, @RequestBody Object content) {
        LinkedHashMap<String, Integer> map;
        map = (LinkedHashMap<String, Integer>) content;
        return ResponseEntity.ok(contactService.replyContact(id, String.valueOf(map.get("content")), request));
    }
}
