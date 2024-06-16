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
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Contact;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.ContactRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.UserRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.ContactService;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.EmailService;

import java.nio.charset.StandardCharsets;

@Service
public class ContactServiceImpl implements ContactService {
    private static final Logger Log = Logger.getLogger(ContactServiceImpl.class.getName());
    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void saveContact(String name, String email, String message) {
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

    @Override
    public Page<Contact> getAllContact(String filter, int start, int end, String sort, String order) {
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
            Specification<Contact> specification = (root, query, criteriaBuilder) -> {
                Predicate predicate = criteriaBuilder.conjunction();
                if (filterJson.has("q")) {
                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("name"), "%" + filterJson.get("q").asText() + "%"));
                }
                if (filterJson.has("type")) {
                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("type"), filterJson.get("type").asInt()));
                }
                if (filterJson.has("status")) {
                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("status"), filterJson.get("status").asBoolean()));
                }
                return predicate;
            };
            return switch (sort) {
                case "status" ->
                        contactRepository.findAll(specification, PageRequest.of(start, end, Sort.by(direction, "status")));
                case "name" ->
                        contactRepository.findAll(specification, PageRequest.of(start, end, Sort.by(direction, "name")));
                case "email" ->
                        contactRepository.findAll(specification, PageRequest.of(start, end, Sort.by(direction, "email")));
                default ->
                        contactRepository.findAll(specification, PageRequest.of(start, end, Sort.by(direction, sort)));
            };
        } catch (RuntimeException e) {
            Log.error("Error in getAllContact: ", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public Contact replyContact(Long id, String reply, HttpServletRequest request) {
        try {
            String jwt = jwtUtils.getJwtFromCookies(request, "shop2h_admin");
            String username = jwtUtils.getUserNameFromJwtToken(jwt);
            Contact contact = contactRepository.findById(id).orElse(null);
            if (contact != null) {
                emailService.sendHtmlEmail(contact.getEmail(), "Reply from ShopThoiTrang", reply);
                contact.setStatus(true);
                contact.setContent(reply);
                contact.setRepliedBy(userRepository.findByUsername(username).orElse(null));
                Log.info(username + " replied contact: " + contact.getId());
                return contactRepository.save(contact);
            }
        } catch (Exception e) {
            Log.error("Error reply contact: " + e.getMessage());
            throw new RuntimeException(e);
        }
        return null;
    }

    @Override
    public Contact getContactById(Long id) {
        try {
            return contactRepository.findById(id).orElse(null);
        } catch (Exception e) {
            Log.error("Error get contact by id: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }
}
