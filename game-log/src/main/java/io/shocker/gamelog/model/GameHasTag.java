package io.shocker.gamelog.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@IdClass(GameHasTagId.class)
@Table(name = "tbl_game_has_tbl_game_tag")
public class GameHasTag {
    @Id
    @Column(name = "tbl_game_id")
    private int gameId;

    @Id
    @Column(name = "tbl_game_tag_id")
    private int tagId;


    public int getGameId() {
        return gameId;
    }

    public void setGameId(int gameId) {
        this.gameId = gameId;
    }

    public int getTagId() {
        return tagId;
    }

    public void setTagId(int tagId) {
        this.tagId = tagId;
    }


}


class GameHasTagId implements Serializable{
    private int gameId;
    private int tagId;

}