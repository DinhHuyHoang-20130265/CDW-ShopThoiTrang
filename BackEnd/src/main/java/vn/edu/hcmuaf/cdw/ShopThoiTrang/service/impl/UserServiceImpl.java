package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Role;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.User;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.UserInfo;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.UserInfoRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.UserRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.UserService;

import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserInfoRepository userInfoRepository;

    @Override
    public User getUserById(Long id) {
        return userRepository.getReferenceById(id);
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
                Join<User, Role> roleJoin = root.join("roles");
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

}
