package vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Variation;

@Repository
public interface VariationRepository extends JpaRepository<Variation, Long> {

}
