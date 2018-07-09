package io.shocker.gamelog.service;

import io.shocker.gamelog.model.User;
import io.shocker.gamelog.repository.RoleRepository;
import io.shocker.gamelog.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AdministrationService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public AdministrationService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public User login(String username, String password) {
        return userRepository.getByUsernameAndAndPassword(username, password);
    }
}
