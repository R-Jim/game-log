package io.shocker.gamelog.repository;

import io.shocker.gamelog.model.Categories;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GearCategoryRepository extends JpaRepository<Categories.GearCategory,Integer>{

    List<Categories.GearCategory> findAll();

    Categories.GearCategory findByValue(String name);
}
