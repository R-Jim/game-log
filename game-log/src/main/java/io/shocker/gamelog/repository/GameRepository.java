package io.shocker.gamelog.repository;

import io.shocker.gamelog.model.Game;
import io.shocker.gamelog.model.Games;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;

import javax.persistence.NamedQuery;
import javax.persistence.NamedStoredProcedureQuery;
import java.util.List;

public interface GameRepository extends JpaRepository<Game,Integer> {
    @Query(value = "CALL get_all_games",nativeQuery = true)
    List<Game> getAllGames();
}
