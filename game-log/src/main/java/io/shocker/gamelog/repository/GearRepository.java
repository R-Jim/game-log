package io.shocker.gamelog.repository;

import io.shocker.gamelog.model.Gears;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GearRepository extends JpaRepository<Gears.Gear,Integer> {
    @Query(value = "CALL get_all_gears(:pageSize,:currentPage,:categoryId)",nativeQuery = true)
    List<Gears.Gear> getAllGears(@Param("pageSize") int pageSize,
                                 @Param("currentPage") int currentPage, @Param("categoryId") String categoryId);


    Gears.Gear findByName(String name);
}
