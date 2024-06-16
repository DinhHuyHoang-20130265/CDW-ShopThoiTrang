package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.criteria.Predicate;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.JWT.JwtUtils;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.ImportInvoice;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.ImportInvoiceDetail;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Size;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.User;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.request.ImportInvoiceDetailRequest;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.request.ImportInvoiceRequest;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.ImportInvoiceService;

import java.net.http.HttpRequest;
import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Service
public class ImportInvoiceServiceImpl implements ImportInvoiceService {
    private static final Logger Log = Logger.getLogger(ImportInvoiceServiceImpl.class.getName());

    @Autowired
    private ImportInvoiceRepository importInvoiceRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private VariationRepository variationRepository;

    @Autowired
    private SizeRepository sizeRepository;

    @Autowired
    private ImportInvoiceDetailRepository importInvoiceDetailRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private HttpServletRequest HttpRequest;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Page<ImportInvoice> getImportInvoices(String filter, int page, int perPage, String sortBy, String order) {
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
            Specification<ImportInvoice> specification = (root, query, criteriaBuilder) -> {
                Predicate predicate = criteriaBuilder.conjunction();
                return predicate;
            };

            if (sortBy.equals("importDate")) {
                return importInvoiceRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, "importDate")));
            }
            if (sortBy.equals("importPrice")) {
                return importInvoiceRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, "importPrice")));
            }

            return importInvoiceRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, sortBy)));
        } catch (RuntimeException e) {
            Log.error("Error in getImportInvoices: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Override
    public ImportInvoice saveImportInvoice(ImportInvoice importInvoice) {
        try {
            Date date = new Date(System.currentTimeMillis());
            importInvoice.setImportDate(date);
            Log.info(importInvoice.getImportBy().getUsername() + " import invoice: " + importInvoice.getId());
            return importInvoiceRepository.save(importInvoice);
        } catch (Exception e) {
            Log.error("Error in saveImportInvoice: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public ImportInvoice saveImportInvoice(List<ImportInvoiceDetailRequest> importInvoice) {
        try {
            User importBy = userRepository.findByUsername(jwtUtils.getUserNameFromJwtToken(jwtUtils.getJwtFromCookies(HttpRequest, "shop2h_admin"))).get();
            ImportInvoice newImportInvoice = new ImportInvoice();
            newImportInvoice.setImportInvoiceDetails(new ArrayList<>());
            newImportInvoice.setImportDate(new Date(System.currentTimeMillis()));
            newImportInvoice.setImportBy(importBy);

            double totalPrice = 0;

            newImportInvoice = importInvoiceRepository.save(newImportInvoice);

            for (ImportInvoiceDetailRequest importInvoiceDetailRequest : importInvoice) {
                ImportInvoiceDetail newImportInvoiceDetail = new ImportInvoiceDetail();
                newImportInvoiceDetail.setImportInvoice(newImportInvoice);
                newImportInvoiceDetail.setProduct(productRepository.findById(importInvoiceDetailRequest.getProduct()).get());
                newImportInvoiceDetail.setVariation(variationRepository.findById(importInvoiceDetailRequest.getVariation()).get());
                newImportInvoiceDetail.setSize(sizeRepository.findById(importInvoiceDetailRequest.getSize()).get());
                newImportInvoiceDetail.setQuantity(importInvoiceDetailRequest.getQuantity());
                newImportInvoiceDetail.setImportPrice(importInvoiceDetailRequest.getImportPrice());
                importInvoiceDetailRepository.save(newImportInvoiceDetail);
                newImportInvoice.getImportInvoiceDetails().add(newImportInvoiceDetail);
                totalPrice += newImportInvoiceDetail.getImportPrice() * newImportInvoiceDetail.getQuantity();
            }
            newImportInvoice.setTotalPrice(totalPrice);
            importInvoiceRepository.save(newImportInvoice);
            Log.info(importBy.getUsername() + " import invoice: " + newImportInvoice.getId());
            return newImportInvoice;
        } catch (Exception e) {
            Log.error("Error in saveImportInvoice: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

}
