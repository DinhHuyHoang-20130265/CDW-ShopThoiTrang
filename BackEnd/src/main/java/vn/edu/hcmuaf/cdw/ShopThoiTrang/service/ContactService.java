package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Contact;

public interface ContactService {
    void saveContact(String name, String email, String message);

    Page<Contact> getAllContact(String filter, int start, int end, String sort, String order);

    Contact replyContact(Long id, String reply, HttpServletRequest request);

    Contact getContactById(Long id);
}
