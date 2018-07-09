package io.shocker.gamelog.repository;

import io.shocker.gamelog.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Integer>{
    Role getById(Integer id);
}
