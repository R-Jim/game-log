package io.shocker.gamelog.repository;

import io.shocker.gamelog.model.Categories;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameCategoryRepository extends JpaRepository<Categories.GameCategory,Integer>{

    List<Categories.GameCategory> findAll();

    Categories.GameCategory findByValue(String name);
}
