package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.criteria.Predicate;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Permission;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.PermissionRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.PermissionService;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@Service
public class PermissionServiceImpl implements PermissionService {

    private static final Logger Log = Logger.getLogger(PermissionServiceImpl.class.getName());
    @Autowired
    private PermissionRepository permissionRepository;

    @Override
    public Page<Permission> getAllPermissions(String filter, int page, int perPage, String sortBy, String order) {
        try {
            Sort.Direction direction = Sort.Direction.ASC;
            if (order.equalsIgnoreCase("DESC"))
                direction = Sort.Direction.DESC;

            JsonNode filterJson;
            try {
                filterJson = new ObjectMapper().readTree(java.net.URLDecoder.decode(filter, StandardCharsets.UTF_8));
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
            Specification<Permission> specification = (root, query, criteriaBuilder) -> {
                Predicate predicate = criteriaBuilder.conjunction();
                if (filterJson.has("name")) {
                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("name"), "%" + filterJson.get("name").asText() + "%"));
                }
                return predicate;
            };

            if (sortBy.equals("name")) {
                return permissionRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, "name")));
            }

            return permissionRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, sortBy)));
        } catch (RuntimeException e) {
            Log.error("Error get all permissions", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Permission> getAllPermissions(String ids) {
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
                return permissionRepository.findAllById(itr);
            }

            return null;
        } catch (RuntimeException e) {
            Log.error("Error get all permissions", e);
            throw new RuntimeException(e);
        }
    }
}
