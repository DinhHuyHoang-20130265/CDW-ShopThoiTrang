package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Contact;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.ContactRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.ContactService;

@Service
public class ContactServiceImpl implements ContactService {

    @Autowired
    private ContactRepository contactRepository;

    @Override
    public void saveContact(String name, String email,  String message) {
        Contact contact = new Contact();
        contact.setName(name);
        contact.setEmail(email);
        contact.setMessage(message);
        contact.setCreatedDate(new java.sql.Timestamp(System.currentTimeMillis()));
        contact.setStatus(false);
        contactRepository.save(contact);
    }
}
