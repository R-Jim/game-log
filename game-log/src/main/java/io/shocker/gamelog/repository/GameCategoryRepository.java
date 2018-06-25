package io.shocker.gamelog.repository;

import io.shocker.gamelog.model.GameCategories;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameCategoryRepository extends JpaRepository<GameCategories.GameCategory,Integer>{

    List<GameCategories.GameCategory> findAll();

    GameCategories.GameCategory findByName(String name);
}
