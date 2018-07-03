package io.shocker.gamelog.repository;

import io.shocker.gamelog.model.Spec;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SpecRepository extends JpaRepository<Spec,Integer> {
    Spec findByGameIdAndMinimum(int gameId, boolean isMinumum);

    @Query(value = "SELECT DISTINCT os FROM tbl_spec",nativeQuery = true)
    List<String> getOsType();

    @Query(value = "SELECT DISTINCT memory FROM tbl_spec",nativeQuery = true)
    List<String> getRamType();

    @Query(value = "SELECT DISTINCT processor FROM tbl_spec",nativeQuery = true)
    List<String> getProcessorType();

    @Query(value = "SELECT DISTINCT graphic FROM tbl_spec",nativeQuery = true)
    List<String> getGraphicType();
}
