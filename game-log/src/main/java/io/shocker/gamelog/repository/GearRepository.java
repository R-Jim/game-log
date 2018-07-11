package io.shocker.gamelog.repository;

import io.shocker.gamelog.model.Gears;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GearRepository extends JpaRepository<Gears.Gear,Integer> {
    @Query(value = "CALL get_all_gears(:nameLike,:pageSize,:currentPage,:categoryId)",nativeQuery = true)
    List<Gears.Gear> getAllGears(@Param("nameLike") String nameLike,@Param("pageSize") int pageSize,
                                 @Param("currentPage") int currentPage, @Param("categoryId") String categoryId);


    Gears.Gear findByName(String name);


    @Query(value = "SELECT DISTINCT cpu FROM tbl_gear",nativeQuery = true)
    List<String> getProcessorType();

    @Query(value = "SELECT DISTINCT ram FROM tbl_gear",nativeQuery = true)
    List<String> getRamType();

    @Query(value = "SELECT DISTINCT os FROM tbl_gear",nativeQuery = true)
    List<String> getOsType();

    @Query(value = "SELECT DISTINCT vga FROM tbl_gear",nativeQuery = true)
    List<String> getGraphicType();

    Gears.Gear getById(Integer id);
}
