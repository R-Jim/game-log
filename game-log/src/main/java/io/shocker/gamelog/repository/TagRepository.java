package io.shocker.gamelog.repository;

import io.shocker.gamelog.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag,Integer>{
    Tag getByName(String name);

    Tag getById(Integer tagId);
}
