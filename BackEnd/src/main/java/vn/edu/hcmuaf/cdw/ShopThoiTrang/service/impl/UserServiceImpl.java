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
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.JWT.JwtUtils;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.CreateUserDTO;
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
    public User getUserById(Long id) {
        return userRepository.findById(id).get();
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    @Override
    public ResponseEntity<?> getAuthorities(String username) {
        return ResponseEntity.ok(userRepository.findByUsername(username).get().getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList()));
    }

    @Override
    public Page<User> getAllUsers(String filter, int page, int perPage, String sortBy, String order) {
        Sort.Direction direction = Sort.Direction.ASC;
        if (order.equalsIgnoreCase("DESC"))
            direction = Sort.Direction.DESC;

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
            return ResponseEntity.badRequest().body("Username is already taken");
        }
        if (userInfoRepository.findByEmail(dto.getUserInfo().getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email is already taken");
        }
        Date currentDate = new Date(System.currentTimeMillis());

        User newUser = new User();
        newUser.setUserInfo(new UserInfo());
        newUser.getUserInfo().setEmail(dto.getUserInfo().getEmail());
        newUser.getUserInfo().setFullName(dto.getUserInfo().getFullName());
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
                Resource resource = resourceRepository.findById(rv.getResource().getId())
                        .orElseThrow(() -> new RuntimeException("Resource not found"));

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

}
