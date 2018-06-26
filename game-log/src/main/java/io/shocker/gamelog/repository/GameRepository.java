package io.shocker.gamelog.repository;

import io.shocker.gamelog.model.Games;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Games.Game,Integer> {
}
