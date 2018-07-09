package io.shocker.gamelog.repository;

import io.shocker.gamelog.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Integer> {
    User getByUsernameAndAndPassword(String username, String password);
}
