package io.shocker.gamelog.repository;

import io.shocker.gamelog.model.Gears;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GearRepository extends JpaRepository<Gears.Gear,Integer> {

    Gears.Gear findByName(String name);
}
