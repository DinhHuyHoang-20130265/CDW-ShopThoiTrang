package vn.edu.hcmuaf.cdw.ShopThoiTrang.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @GetMapping
    public ResponseEntity<?> getImportInvoices(@RequestParam(defaultValue = "0") int page,
                                                      @RequestParam(defaultValue = "{}") String filter,
                                                      @RequestParam(defaultValue = "25") int perPage,
                                                      @RequestParam(defaultValue = "importDate") String sort,
                                                      @RequestParam(defaultValue = "DESC") String order) {
        return ResponseEntity.ok(importInvoiceService.getImportInvoices(filter, page, perPage, sort, order));
    }

    @PostMapping
    public ResponseEntity<?> saveImportInvoices(@RequestBody List<ImportInvoiceDetailRequest> importInvoice) {
        return ResponseEntity.ok(importInvoiceService.saveImportInvoice(importInvoice));
    }

}
