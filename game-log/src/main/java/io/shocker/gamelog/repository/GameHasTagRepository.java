package io.shocker.gamelog.repository;

import io.shocker.gamelog.model.GameHasTag;
import io.shocker.gamelog.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameHasTagRepository extends JpaRepository<GameHasTag,Integer> {

    List<GameHasTag> findAllByGameId(Integer gameId);
}
