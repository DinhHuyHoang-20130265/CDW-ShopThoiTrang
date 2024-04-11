package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;


import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.User;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.CreateUserDTO;

import java.io.UnsupportedEncodingException;

public interface UserService {
    User getUserById(Long id);

    User getUserByUsername(String username);

    ResponseEntity<?> getAuthorities(String username);

    Page<User> getAllUsers(String filter, int page, int perPage, String sortBy, String order) throws UnsupportedEncodingException;

    ResponseEntity<?> saveUser(CreateUserDTO dto, HttpServletRequest request);
}
