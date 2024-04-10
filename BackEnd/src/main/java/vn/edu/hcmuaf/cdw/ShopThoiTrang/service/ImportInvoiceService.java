package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;

import org.springframework.data.domain.Page;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.ImportInvoice;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.request.ImportInvoiceRequest;

import java.util.List;

public interface ImportInvoiceService {
    Page<ImportInvoice> getImportInvoices(String filter, int page, int perPage, String sortBy, String order);

    ImportInvoice saveImportInvoice(ImportInvoice importInvoice);

    List<ImportInvoice> saveImportInvoices(List<ImportInvoiceRequest> importInvoices);
}
