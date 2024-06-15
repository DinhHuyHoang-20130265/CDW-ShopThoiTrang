package vn.edu.hcmuaf.cdw.ShopThoiTrang.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Category;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.request.ImportInvoiceDetailRequest;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.request.ImportInvoiceRequest;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.ImportInvoiceService;

import java.util.List;

@RestController
@RequestMapping("/api/import-invoice")
public class ImportInvoiceController {

    @Autowired
    private ImportInvoiceService importInvoiceService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or @securityService.isSuperAdmin()")
    @GetMapping
    public ResponseEntity<?> getImportInvoices(@RequestParam(defaultValue = "0") int page,
                                               @RequestParam(defaultValue = "{}") String filter,
                                               @RequestParam(defaultValue = "25") int perPage,
                                               @RequestParam(defaultValue = "importDate") String sort,
                                               @RequestParam(defaultValue = "DESC") String order) {
        return ResponseEntity.ok(importInvoiceService.getImportInvoices(filter, page, perPage, sort, order));
    }

    @PreAuthorize("(hasAuthority('ROLE_ADMIN') and hasAuthority('INVOICE_CREATE')) or @securityService.isSuperAdmin()")
    @PostMapping
    public ResponseEntity<?> saveImportInvoices(@RequestBody List<ImportInvoiceDetailRequest> importInvoice) {
        return ResponseEntity.ok(importInvoiceService.saveImportInvoice(importInvoice));
    }

}
