package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;


import org.springframework.data.domain.Page;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.User;

import java.io.UnsupportedEncodingException;
import java.util.List;

public interface UserService {
    User getUserById(Long id);

    User getUserByUsername(String username);

    Page<User> getAllUsers(String filter, int start, int end, String sortBy, String order) throws UnsupportedEncodingException;
}
