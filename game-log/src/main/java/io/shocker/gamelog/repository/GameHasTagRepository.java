package io.shocker.gamelog.repository;

import io.shocker.gamelog.model.GameHasTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameHasTagRepository extends JpaRepository<GameHasTag,Integer> {
}
