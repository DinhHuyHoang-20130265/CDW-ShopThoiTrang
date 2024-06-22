package vn.edu.hcmuaf.cdw.ShopThoiTrang.controller;

import jakarta.annotation.security.PermitAll;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.JWT.JwtUtils;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.config.FrontendProperties;
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
    private FrontendProperties frontendProperties;
    @Autowired
    UserInfoService userInfoService;

    @Autowired
    UserService userService;

    @GetMapping("/info")
    public ResponseEntity<?> userInfo() {
        String requestOrigin = request.getHeader("origin");
        String jwtName = (requestOrigin.equals(frontendProperties.getUrl()) || requestOrigin.equals("http://localhost:3000")) ? "shop2h" :
                (requestOrigin.equals(frontendProperties.getAdmin()) || requestOrigin.equals("http://localhost:3001")) ? "shop2h_admin" : null;
        String jwt = jwtUtils.getJwtFromCookies(request, jwtName);
        if (jwt == null) {
            return ResponseEntity.badRequest().body("Token is null");
        }
        String username = jwtUtils.getUserNameFromJwtToken(jwt);
        return userInfoService.findByUserId(userService.getUserByUsername(username).getId());
    }

    @PreAuthorize("@securityService.isSuperAdmin() or hasAuthority('ROLE_ADMIN')")
    @GetMapping("/get-authorities")
    public ResponseEntity<?> getAuthorities() {
        String requestOrigin = request.getHeader("origin");
        String jwtName = (requestOrigin.equals(frontendProperties.getUrl()) || requestOrigin.equals("http://localhost:3000")) ? "shop2h" :
                (requestOrigin.equals(frontendProperties.getAdmin()) || requestOrigin.equals("http://localhost:3001")) ? "shop2h_admin" : null;
        String jwt = jwtUtils.getJwtFromCookies(request, jwtName);
        if (jwt == null) {
            return ResponseEntity.badRequest().body("Token is null");
        }
        String username = jwtUtils.getUserNameFromJwtToken(jwt);
        return userService.getAuthorities(username);
    }

    @PreAuthorize("@securityService.isSuperAdmin() or hasAuthority('ROLE_ADMIN')")
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

    @PreAuthorize("@securityService.isSuperAdmin() or hasAuthority('ROLE_ADMIN')")
    @GetMapping("/ids")
    public ResponseEntity<?> getUsersByIds(@RequestParam(defaultValue = "{}") String ids) {
        List<User> users = userService.getAllUsers(ids);
        return ResponseEntity.ok(users);
    }

    @PreAuthorize("@securityService.isSuperAdmin() or hasAuthority('ROLE_ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        UserDto user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PreAuthorize("(hasAuthority('ROLE_ADMIN') and hasAuthority('USER_CREATE')) or @securityService.isSuperAdmin()")
    @PostMapping
    public ResponseEntity<?> saveUser(@RequestBody CreateUserDTO dto) {
        return ResponseEntity.ok(userService.saveUser(dto, request));
    }

    @PreAuthorize("(hasAuthority('ROLE_ADMIN') and hasAuthority('USER_UPDATE')) or @securityService.isSuperAdmin()")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UpdateUserDTO dto) {
        return ResponseEntity.ok(userService.updateUser(id, dto, request));
    }

    @PreAuthorize("(hasAuthority('ROLE_ADMIN') and hasAuthority('USER_DELETE')) or @securityService.isSuperAdmin()")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id, request);
        return ResponseEntity.ok("Deleted");
    }

    @PreAuthorize("(hasAuthority('ROLE_ADMIN') and hasAuthority('USER_UPDATE')) or @securityService.isSuperAdmin()")
    @PutMapping("/deleted/{id}")
    public ResponseEntity<?> restoreUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.restoreUser(id, request));
    }

    @PreAuthorize("@securityService.isUser()")
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestParam String id, @RequestParam String oldPassword, @RequestParam String newPassword) {
        return ResponseEntity.ok(userService.changePassword(Long.parseLong(id), oldPassword, newPassword));
    }

    @PreAuthorize("@securityService.isUser()")
    @PutMapping("/update-info")
    public ResponseEntity<?> updateInfo(@RequestParam String id, @RequestParam String name, @RequestParam String phone, @RequestParam String email, @RequestParam String avtUrl) {
        return ResponseEntity.ok(userService.updateInfo(Long.parseLong(id), name, phone, email, avtUrl));
    }

}
