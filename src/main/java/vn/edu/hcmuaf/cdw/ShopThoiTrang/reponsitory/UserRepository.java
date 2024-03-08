package vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

    User findByUsername(String username);

    boolean existsByUsername(String email);

    User findByName(String fullName);
}
