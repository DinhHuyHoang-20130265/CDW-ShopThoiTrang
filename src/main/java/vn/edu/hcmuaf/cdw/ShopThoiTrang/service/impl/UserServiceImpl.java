package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.User;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.PermissionRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.RoleRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.UserInfoRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.UserRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.UserService;

import java.util.List;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PermissionRepository permissionRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        if (!user.isEnabled()) {
            throw new UsernameNotFoundException("User is not enabled");
        }if (user.isLocked()) {
            throw new UsernameNotFoundException("User is locked");
        }

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPasswordEncrypted(),
                user.isEnabled(),
                true,
                true,
                !user.isLocked(),
                user.getAuthorities()
        );
    }
}
