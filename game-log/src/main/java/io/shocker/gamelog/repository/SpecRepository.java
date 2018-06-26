package io.shocker.gamelog.repository;

import io.shocker.gamelog.model.Spec;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpecRepository extends JpaRepository<Spec,Integer> {
    Spec findByGameIdAndMinimum(int gameId, boolean isMinumum);
}
