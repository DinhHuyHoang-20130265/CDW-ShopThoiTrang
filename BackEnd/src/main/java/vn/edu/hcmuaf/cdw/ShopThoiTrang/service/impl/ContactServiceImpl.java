package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import lombok.Setter;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Contact;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.ContactRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.ContactService;

@Service
public class ContactServiceImpl implements ContactService {
    private static final Logger Log = Logger.getLogger(ContactServiceImpl.class.getName());
    @Autowired
    private ContactRepository contactRepository;

    @Override
    public void saveContact(String name, String email,  String message) {
        try {
            Contact contact = new Contact();
            contact.setName(name);
            contact.setEmail(email);
            contact.setMessage(message);
            contact.setCreatedDate(new java.sql.Timestamp(System.currentTimeMillis()));
            contact.setStatus(false);
            Log.info("Save contact: " + contact.getId());
            contactRepository.save(contact);
        } catch (Exception e) {
            Log.error("Error save contact: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }
}
