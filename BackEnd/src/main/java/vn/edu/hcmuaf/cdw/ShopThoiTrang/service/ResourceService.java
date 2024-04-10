package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;
import org.springframework.data.domain.Page;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Resource;

import java.util.List;
public interface ResourceService {
    Page<Resource> getAllResources(String filter, int page, int perPage, String sortBy, String order);
    List<Resource> getAllResources(String ids);
}
