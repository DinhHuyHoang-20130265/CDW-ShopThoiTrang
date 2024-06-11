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
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Category;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Resource;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.ResourceRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.ResourceService;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@Service
public class ResourceServiceImpl implements ResourceService {

    private static final Logger Log = Logger.getLogger(ResourceServiceImpl.class.getName());

    @Autowired
    private ResourceRepository resourceRepository;


    @Override
    public Page<Resource> getAllResources(String filter, int page, int perPage, String sortBy, String order) {
        try {
            Sort.Direction direction = Sort.Direction.ASC;
            if (order.equalsIgnoreCase("DESC")) direction = Sort.Direction.DESC;

            JsonNode filterJson;
            try {
                filterJson = new ObjectMapper().readTree(java.net.URLDecoder.decode(filter, StandardCharsets.UTF_8));
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
            Specification<Resource> specification = (root, query, criteriaBuilder) -> {
                Predicate predicate = criteriaBuilder.conjunction();
                if (filterJson.has("name")) {
                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("name"), "%" + filterJson.get("name").asText() + "%"));
                }
                return predicate;
            };

            if (sortBy.equals("name")) {
                return resourceRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, "name")));
            }

            return resourceRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, sortBy)));
        } catch (RuntimeException e) {
            Log.error("Error in getAllPromotion: ", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Resource> getAllResources(String ids) {
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
                return resourceRepository.findAllById(itr);
            }

            return null;
        } catch (RuntimeException e) {
            Log.error("Error in getAllPromotion: ", e);
            throw new RuntimeException(e);
        }
    }
}
