package vn.edu.hcmuaf.cdw.ShopThoiTrang.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Category;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.ImportInvoiceService;

@RestController
@RequestMapping("/api/import-invoice")
public class ImportInvoiceController {

    @Autowired
    private ImportInvoiceService importInvoiceService;

    @GetMapping
    public ResponseEntity<?> getImportInvoices(@RequestParam(defaultValue = "0") int page,
                                                      @RequestParam(defaultValue = "{}") String filter,
                                                      @RequestParam(defaultValue = "25") int perPage,
                                                      @RequestParam(defaultValue = "quantity") String sort,
                                                      @RequestParam(defaultValue = "DESC") String order) {
        return ResponseEntity.ok(importInvoiceService.getImportInvoices(filter, page, perPage, sort, order));
    }

}
