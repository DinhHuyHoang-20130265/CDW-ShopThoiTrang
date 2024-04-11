package vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Resource;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.ResourceVariation;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.User;

public interface ResourceVariationRepository extends JpaRepository<ResourceVariation, Long> {

    void deleteAllByUser(User user);

    ResourceVariation findByUserAndResource(User user, Resource resource);
}
