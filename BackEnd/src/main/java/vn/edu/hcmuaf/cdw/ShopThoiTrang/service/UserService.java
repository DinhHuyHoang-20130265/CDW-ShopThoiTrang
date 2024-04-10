package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;


import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.User;

import java.io.UnsupportedEncodingException;
import java.util.Optional;

public interface UserService {
    User getUserById(Long id);

    User getUserByUsername(String username);

    ResponseEntity<?> getAuthorities(String username);

    Page<User> getAllUsers(String filter, int page, int perPage, String sortBy, String order) throws UnsupportedEncodingException;
}
