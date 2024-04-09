package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;

import org.springframework.data.domain.Page;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.ImportInvoice;

public interface ImportInvoiceService {
    Page<ImportInvoice> getImportInvoices(String filter, int page, int perPage, String sortBy, String order);

    ImportInvoice saveImportInvoice(ImportInvoice importInvoice);

}
