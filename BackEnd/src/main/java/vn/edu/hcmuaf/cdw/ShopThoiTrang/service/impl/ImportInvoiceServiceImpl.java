package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.ImportInvoice;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.ImportInvoiceRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.ImportInvoiceService;

import java.nio.charset.StandardCharsets;
import java.sql.Date;

@Service
public class ImportInvoiceServiceImpl implements ImportInvoiceService {

    @Autowired
    private ImportInvoiceRepository importInvoiceRepository;

    @Override
    public Page<ImportInvoice> getImportInvoices(String filter, int page, int perPage, String sortBy, String order) {
        Sort.Direction direction = Sort.Direction.ASC;
        if (order.equalsIgnoreCase("DESC"))
            direction = Sort.Direction.DESC;

        JsonNode filterJson;
        try {
            filterJson = new ObjectMapper().readTree(java.net.URLDecoder.decode(filter, StandardCharsets.UTF_8));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        Specification<ImportInvoice> specification = (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();
            if (filterJson.has("importPrice")) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("importPrice"), "%" + filterJson.get("importPrice").asText() + "%"));
            }
            if (filterJson.has("importDate")) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("importDate"), "%" + filterJson.get("importDate").asText() + "%"));
            }

            return predicate;
        };

        if (sortBy.equals("importDate")) {
            return importInvoiceRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, "importDate")));
        }
        if (sortBy.equals("importPrice")) {
            return importInvoiceRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, "importPrice")));
        }

        return importInvoiceRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, sortBy)));
    }

    @Override
    public ImportInvoice saveImportInvoice(ImportInvoice importInvoice) {
        Date date = new Date(System.currentTimeMillis());
        importInvoice.setImportDate(date);
        return importInvoiceRepository.save(importInvoice);
    }
}
