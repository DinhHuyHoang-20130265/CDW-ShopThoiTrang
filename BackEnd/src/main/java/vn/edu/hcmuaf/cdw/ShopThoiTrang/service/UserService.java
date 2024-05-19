package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;


import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.User;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.CreateUserDTO;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.UpdateUserDTO;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.UserDto;

import java.io.UnsupportedEncodingException;
import java.util.List;

public interface UserService {
    UserDto getUserById(Long id);

    User getUserByUsername(String username);

    ResponseEntity<?> getAuthorities(String username);

    Page<User> getAllUsers(String filter, int page, int perPage, String sortBy, String order) throws UnsupportedEncodingException;

    ResponseEntity<?> saveUser(CreateUserDTO dto, HttpServletRequest request);

    User updateUser(Long id, UpdateUserDTO dto, HttpServletRequest request);

    void deleteUser(Long id);

    List<User> getAllUsers(String ids);
}
