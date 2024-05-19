package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.servlet.http.HttpServletRequest;
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
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class UserServiceImpl implements UserService {

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

    @Override
    public UserDto getUserById(Long id) {
        return userRepository.findById(id).map(UserDto::new).orElse(null);
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    @Override
    public ResponseEntity<?> getAuthorities(String username) {
        return ResponseEntity.ok(userRepository.findByUsername(username).get().getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()));
    }

    @Override
    public Page<User> getAllUsers(String filter, int page, int perPage, String sortBy, String order) {
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
    }

    @Override
    @Transactional
    public ResponseEntity<?> saveUser(CreateUserDTO dto, HttpServletRequest request) {
        System.out.println(dto);
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
        String jwt = jwtUtils.getJwtFromCookies(request);
        if (jwt == null) {
            return ResponseEntity.badRequest().body("Token is null");
        }
        String username = jwtUtils.getUserNameFromJwtToken(jwt);
        newUser.setCreatedBy(userRepository.findByUsername(username).get());
        newUser.setUpdateBy(userRepository.findByUsername(username).get());
        newUser.getUserInfo().setUser(newUser);
        return ResponseEntity.ok(userRepository.save(newUser));

    }

    @Override
    public User updateUser(Long id, UpdateUserDTO dto, HttpServletRequest request) {
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
        user.setUpdateBy(userRepository.findByUsername(jwtUtils.getUserNameFromJwtToken(jwtUtils.getJwtFromCookies(request))).get());
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
            if (dto.getResourceVariations() == null || dto.getResourceVariations().isEmpty()) {
                throw new RuntimeException("Resource variations is required");
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

        return userRepository.save(user);
    }

    private void updateResourceVariation(ResourceVariation existingResourceVariation, List<Permission> permissions) {
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
        resourceVariationRepository.save(existingResourceVariation);
    }

    @Override
    public void deleteUser(Long id) {

    }

    @Override
    public List<User> getAllUsers(String ids) {
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
    }

}
