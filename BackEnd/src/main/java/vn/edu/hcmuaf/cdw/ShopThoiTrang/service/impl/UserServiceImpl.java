package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.JWT.JwtUtils;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.CreateUserDTO;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.UpdateUserDTO;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.UserDto;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.ResourceRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.ResourceVariationRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.UserInfoRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.UserRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.UserService;

import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class UserServiceImpl implements UserService {

    private static final Logger Log = Logger.getLogger(UserServiceImpl.class.getName());

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserInfoRepository userInfoRepository;

    @Autowired
    ResourceVariationRepository resourceVariationRepository;
    @Autowired
    ResourceRepository resourceRepository;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private HttpServletRequest request;

    @Override
    public UserDto getUserById(Long id) {
        try {
            return userRepository.findById(id).map(UserDto::new).orElse(null);
        } catch (Exception e) {
            Log.error("Error in getUserById: ", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public String changePassword(Long id, String oldPassword, String newPassword) {
        try {
            User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
            if (!passwordEncoder.matches(oldPassword, user.getPasswordEncrypted())) {
                Log.warn(user.getUsername() + " tried to change password but old password is incorrect");
                return "Mật khẩu cũ không đúng!";
            }
            user.setPasswordEncrypted(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            Log.info(user.getUsername() + " changed password successfully");
            return "Đổi mật khẩu thành công!";
        } catch (RuntimeException e) {
            Log.error("Error in changePassword: ", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public String updateInfo(Long id, String name, String phone, String email, String avtUrl) {
        try {
            UserInfo userInfo = userInfoRepository.findByUserId(id);
            userInfo.setFullName(name);
            userInfo.setPhone(phone);
            userInfo.setEmail(email);
            userInfo.setAvtUrl(avtUrl);
            userInfoRepository.save(userInfo);
            Log.info("UserId " + id + " updated info successfully");
            return "Cập nhật thông tin thành công!";
        } catch (RuntimeException e) {
            Log.error("Error in updateInfo: ", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public User getUserByUsername(String username) {
        try {
            return userRepository.findByUsername(username).orElse(null);
        } catch (Exception e) {
            Log.error("Error in getUserByUsername: ", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<?> getAuthorities(String username) {
        try {
            User user = userRepository.findByUsername(username).orElse(null);
            return user == null ? ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found") : ResponseEntity.ok(user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()));
        } catch (Exception e) {
            Log.error("Error in getAuthorities: ", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public Page<User> getAllUsers(String filter, int page, int perPage, String sortBy, String order) {
        try {
            Sort.Direction direction = Sort.Direction.ASC;
            if (order.equalsIgnoreCase("DESC")) direction = Sort.Direction.DESC;

            JsonNode filterJson;
            try {
                filterJson = new ObjectMapper().readTree(java.net.URLDecoder.decode(filter, StandardCharsets.UTF_8));
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
            Specification<User> specification = (root, query, criteriaBuilder) -> {
                Predicate predicate = criteriaBuilder.conjunction();

                if (filterJson.has("status")) {
                    boolean accountStatus = filterJson.get("status").asBoolean();
                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("enabled"), accountStatus));
                }

                if (filterJson.has("deleted")) {
                    boolean accountStatus = filterJson.get("deleted").asBoolean();
                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("deleted"), accountStatus));
                }

                if (filterJson.has("q")) {
                    String searchString = filterJson.get("q").asText();
                    Join<User, UserInfo> userInfoJoin = root.join("userInfo");
                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(criteriaBuilder.lower(userInfoJoin.get("fullName")), "%" + searchString.toLowerCase() + "%"));
                }

                if (filterJson.has("type")) {
                    String type = filterJson.get("type").asText();
                    Join<User, Role> roleJoin = root.join("role");
                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.isTrue(roleJoin.get("name").in(type)));
                }

                String jwt = jwtUtils.getJwtFromCookies(request, "shop2h_admin");
                String username = jwtUtils.getUserNameFromJwtToken(jwt);

                predicate = criteriaBuilder.and(predicate, criteriaBuilder.notEqual(root.get("username"), username));
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.notEqual(root.get("role").get("name"), "SUPER_ADMIN"));

                return predicate;
            };

            if (sortBy.equals("username") || sortBy.equals("createdDate")) {
                return userRepository.findAll(specification, PageRequest.of(page, perPage, direction, sortBy));
            }

            if (sortBy.equals("fullName")) {
                return userRepository.findAll((root, query, criteriaBuilder) -> {
                    root.join("userInfo");
                    return specification.toPredicate(root, query, criteriaBuilder);
                }, PageRequest.of(page, perPage, direction, "userInfo.fullName"));
            }

            return userRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, sortBy)));
        } catch (RuntimeException e) {
            Log.error("Error in getAllUsers: ", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<?> saveUser(CreateUserDTO dto, HttpServletRequest request) {
        try {
            if (userRepository.findByUsername(dto.getUsername()).isPresent()) {
                return new ResponseEntity<>("Username is already taken", HttpStatus.BAD_REQUEST);
            }
            if (userInfoRepository.findByEmail(dto.getUserInfo().getEmail()) != null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is already taken");
            }
            Date currentDate = new Date(System.currentTimeMillis());

            User newUser = new User();
            newUser.setUserInfo(new UserInfo());
            newUser.getUserInfo().setEmail(dto.getUserInfo().getEmail());
            newUser.getUserInfo().setFullName(dto.getUserInfo().getFullName());
            newUser.getUserInfo().setAvtUrl(dto.getUserInfo().getAvtUrl());
            newUser.getUserInfo().setPhone(dto.getUserInfo().getPhone());
            newUser.setPasswordEncrypted(passwordEncoder.encode(dto.getPassword()));
            newUser.setEnabled(dto.isEnabled());
            newUser.setUsername(dto.getUsername());
            newUser.setRole(dto.getRole());
            newUser.setCreatedDate(currentDate);
            newUser.setUpdateDate(currentDate);
            newUser.setResourceVariations(new ArrayList<>());
            if (!dto.getRole().getName().equals("USER")) {
                if (dto.getResourceVariations() == null || dto.getResourceVariations().isEmpty()) {
                    Log.warn("In saveUser: Resource variations is required");
                    return ResponseEntity.badRequest().body("Resource variations is required");
                }
                List<ResourceVariation> resourceVariations = new ArrayList<>();
                for (ResourceVariation rv : dto.getResourceVariations()) {
                    ResourceVariation resourceVariation = new ResourceVariation();
                    Resource resource = resourceRepository.findById(rv.getResource().getId()).orElseThrow(() -> new RuntimeException("Resource not found"));

                    resourceVariation.setResource(resource);
                    resourceVariation.setPermissions(rv.getPermissions());
                    resourceVariation.setUser(newUser);
                    resourceVariations.add(resourceVariation);
                }
                newUser.setResourceVariations(resourceVariations);
            }
            String jwt = jwtUtils.getJwtFromCookies(request, "shop2h_admin");
            if (jwt == null) {
                return ResponseEntity.badRequest().body("Token is null");
            }
            String username = jwtUtils.getUserNameFromJwtToken(jwt);
            newUser.setCreatedBy(userRepository.findByUsername(username).get());
            newUser.setUpdateBy(userRepository.findByUsername(username).get());
            newUser.getUserInfo().setUser(newUser);
            Log.info("User " + username + " created user " + newUser.getUsername());
            return ResponseEntity.ok(userRepository.save(newUser));
        } catch (RuntimeException e) {
            Log.error("Error in saveUser: ", e);
            throw new RuntimeException(e);
        }

    }

    @Override
    @Transactional
    public User updateUser(Long id, UpdateUserDTO dto, HttpServletRequest request) {
        try {
            Date currentDate = new Date(System.currentTimeMillis());
            User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

            UserInfo userInfo = user.getUserInfo();
            userInfo.setFullName(dto.getUserInfo().getFullName());
            userInfo.setEmail(dto.getUserInfo().getEmail());
            userInfo.setPhone(dto.getUserInfo().getPhone());
            userInfo.setAvtUrl(dto.getUserInfo().getAvtUrl());

            userInfoRepository.save(userInfo);

            user.setEnabled(dto.isEnabled());
            user.setRole(dto.getRole());
            user.setUpdateDate(currentDate);
            user.setUpdateBy(userRepository.findByUsername(jwtUtils.getUserNameFromJwtToken(jwtUtils.getJwtFromCookies(request, "shop2h_admin"))).get());
            if (dto.getRole().getName().equals("USER")) {
                if (user.getResourceVariations() != null && !user.getResourceVariations().isEmpty()) {
                    List<ResourceVariation> resourceVariations = new ArrayList<>(user.getResourceVariations());
                    for (ResourceVariation rv : resourceVariations) {
                        rv.setResource(null);
                        rv.setUser(null);
                        rv.setPermissions(null);
                        resourceVariationRepository.save(rv);
                        resourceVariationRepository.delete(rv);
                    }

                    user.getResourceVariations().clear();
                    resourceVariationRepository.deleteAll(resourceVariations);
                }
            } else {
                if (!Objects.equals(user.getRole().getName(), "SUPER_ADMIN")) {
                    if (dto.getResourceVariations() == null || dto.getResourceVariations().isEmpty()) {
                        Log.warn("In updateUser: Resource variations is required");
                        throw new RuntimeException("Resource variations is required");
                    }
                }
                List<ResourceVariation> resourceVariations = new ArrayList<>();
                for (ResourceVariation rv : dto.getResourceVariations()) {
                    ResourceVariation existingResourceVariation = resourceVariationRepository.findByUserAndResource(user, rv.getResource());
                    if (existingResourceVariation != null) {
                        updateResourceVariation(existingResourceVariation, rv.getPermissions());
                        resourceVariations.add(existingResourceVariation);
                    } else {
                        ResourceVariation resourceVariation = new ResourceVariation();
                        Resource resource = resourceRepository.findById(rv.getResource().getId()).orElseThrow(() -> new RuntimeException("Resource not found"));

                        resourceVariation.setResource(resource);
                        resourceVariation.setPermissions(rv.getPermissions());
                        resourceVariation.setUser(user);
                        resourceVariations.add(resourceVariation);
                    }
                }
                List<ResourceVariation> resourceVariationsToDelete = new ArrayList<>();
                for (ResourceVariation rv : user.getResourceVariations()) {
                    if (dto.getResourceVariations().stream().noneMatch(x -> x.getResource().getId().equals(rv.getResource().getId())))
                        resourceVariationsToDelete.add(rv);
                }
                for (ResourceVariation rv : resourceVariationsToDelete) {
                    user.getResourceVariations().removeIf(x -> x.getResource().getId().equals(rv.getResource().getId()));
                    rv.setResource(null);
                    rv.setUser(null);
                    rv.setPermissions(null);
                    resourceVariationRepository.save(rv);
                    resourceVariationRepository.delete(rv);
                }
                user.setResourceVariations(resourceVariations);

            }
            Log.info("User " + user.getUsername() + " updated user " + user.getUsername());
            return userRepository.save(user);
        } catch (RuntimeException e) {
            Log.error("Error in updateUser: ", e);
            throw new RuntimeException(e);
        }
    }

    private void updateResourceVariation(ResourceVariation existingResourceVariation, List<Permission> permissions) {
        try {
            for (Permission permission : permissions) {
                if (!existingResourceVariation.getPermissions().contains(permission)) {
                    existingResourceVariation.getPermissions().add(permission);
                }
            }
            List<Permission> permissionsToRemove = new ArrayList<>();
            for (Permission permission : existingResourceVariation.getPermissions()) {
                if (!permissions.contains(permission)) {
                    permissionsToRemove.add(permission);
                }
            }

            for (Permission permission : permissionsToRemove) {
                existingResourceVariation.getPermissions().remove(permission);
            }
            Log.info("ResourceVariation updated: " + existingResourceVariation + "by user " + existingResourceVariation.getUser().getUsername());
            resourceVariationRepository.save(existingResourceVariation);
        } catch (Exception e) {
            Log.error("Error in updateResourceVariation: ", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deleteUser(Long id, HttpServletRequest request) {
        try {
            String jwt = jwtUtils.getJwtFromCookies(request, "shop2h_admin");
            String username = jwtUtils.getUserNameFromJwtToken(jwt);
            User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
            if (username.equals(user.getUsername())) {
                Log.warn("User " + username + " tried to delete himself");
                throw new RuntimeException("You can't delete yourself");
            }
            user.setDeleted(true);
            userRepository.save(user);
            Log.info("User " + username + " deleted user " + user.getUsername());
        } catch (RuntimeException e) {
            Log.error("Error in deleteUser: ", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<User> getAllUsers(String ids) {
        try {
            JsonNode filterJson;
            try {
                filterJson = new ObjectMapper().readTree(java.net.URLDecoder.decode(ids, StandardCharsets.UTF_8));
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
            if (filterJson.has("ids")) {
                List<Long> idsList = new ArrayList<>();
                for (JsonNode idNode : filterJson.get("ids")) {
                    idsList.add(idNode.asLong());
                }
                Iterable<Long> itr = List.of(Stream.of(idsList).flatMap(List::stream).toArray(Long[]::new));
                return userRepository.findAllById(itr);
            }

            return null;
        } catch (RuntimeException e) {
            Log.error("Error in getAllUsers: ", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public User restoreUser(Long id, HttpServletRequest request) {
        try {
            String jwt = jwtUtils.getJwtFromCookies(request, "shop2h_admin");
            String username = jwtUtils.getUserNameFromJwtToken(jwt);
            User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
            user.setDeleted(false);
            Log.info("User " + username + " restored user " + user.getUsername());
            return userRepository.save(user);
        } catch (RuntimeException e) {
            Log.error("Error in restoreUser: ", e);
            throw new RuntimeException(e);
        }
    }

}
