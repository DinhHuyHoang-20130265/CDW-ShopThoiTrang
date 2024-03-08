package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.User;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.LoginDto;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.UserRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public ResponseEntity<?> login(LoginDto loginDto) {
        if (userRepository.existsByUsername(loginDto.getEmail())) {
            User user = userRepository.findBy(loginDto.());
            if (user.isEnabled()) {
                LoginDto response = new LoginDto();
                response.setId(user.getId());
                response.setEmail(user.getUserInfo().getEmail());
                response.setFullName(user.getUserInfo().getFullName());
                response.setAdmin(null);
                response.setPassword(loginDto.getPassword());
                if (passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
                    return new ResponseEntity<>(response, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("Password incorrect", HttpStatus.BAD_REQUEST);
                }
            } else {
                return new ResponseEntity<>("Account is locked", HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>("Email not found", HttpStatus.NOT_FOUND);
        }
    }


}