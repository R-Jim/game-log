package io.shocker.gamelog.repository;

import io.shocker.gamelog.model.GearHasCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GearHasCategoryRepository extends JpaRepository<GearHasCategory,Integer> {
}
