package vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.ImportInvoice;

@Repository
public interface ImportInvoiceRepository extends JpaRepository<ImportInvoice, Long> {
    Page<ImportInvoice> findAll(Specification<ImportInvoice> specification, Pageable pageable);

}
