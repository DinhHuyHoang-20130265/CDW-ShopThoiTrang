package vn.edu.hcmuaf.cdw.ShopThoiTrang.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.JWT.JwtUtils;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Product;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.User;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.CreateUserDTO;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.UpdateUserDTO;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.UserDto;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.UserInfoService;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.UserService;

import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private HttpServletRequest request;

    @Autowired
    UserInfoService userInfoService;

    @Autowired
    UserService userService;

    @GetMapping("/info")
    public ResponseEntity<?> userInfo() {
        String jwt = jwtUtils.getJwtFromCookies(request);
        if (jwt == null) {
            return ResponseEntity.badRequest().body("Token is null");
        }
        String username = jwtUtils.getUserNameFromJwtToken(jwt);
        return userInfoService.findById(userService.getUserByUsername(username).getId());
    }

    @GetMapping("/get-authorities")
    public ResponseEntity<?> getAuthorities() {
        String jwt = jwtUtils.getJwtFromCookies(request);
        if (jwt == null) {
            return ResponseEntity.badRequest().body("Token is null");
        }
        String username = jwtUtils.getUserNameFromJwtToken(jwt);
        return userService.getAuthorities(username);
    }

    @GetMapping
    public ResponseEntity<Page<User>> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "{}") String filter,
            @RequestParam(defaultValue = "25") int perPage,
            @RequestParam(defaultValue = "createdDate") String sort,
            @RequestParam(defaultValue = "DESC") String order) throws UnsupportedEncodingException {
        Page<User> users = userService.getAllUsers(filter, page, perPage, sort, order);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/ids")
    public ResponseEntity<?> getUsersByIds(@RequestParam(defaultValue = "{}") String ids) {
        List<User> users = userService.getAllUsers(ids);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        UserDto user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping
    public ResponseEntity<?> saveUser(@RequestBody CreateUserDTO dto) {
        return ResponseEntity.ok(userService.saveUser(dto, request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody UpdateUserDTO dto) {
        return ResponseEntity.ok(userService.updateUser(id, dto, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("Deleted");
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestParam String id, @RequestParam String oldPassword, @RequestParam String newPassword) {
        return ResponseEntity.ok(userService.changePassword(Long.parseLong(id), oldPassword, newPassword));
    }

    @PostMapping("/update-info")
    public ResponseEntity<?> updateInfo(@RequestParam String id, @RequestParam String name, @RequestParam String phone, @RequestParam String email) {

        return ResponseEntity.ok(userService.updateInfo(Long.parseLong(id), name, phone, email));
    }
}
