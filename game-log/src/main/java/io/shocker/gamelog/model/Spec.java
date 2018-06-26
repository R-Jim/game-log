package io.shocker.gamelog.model;


import javax.persistence.*;

@Entity
@Table(name = "tbl_spec")
public class Spec {
    private int id;
    private int gameId;
    private boolean isMinimum;
    private String os;
    private String processor;
    private String memory;
    private String graphic;


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "tbl_game_id")
    public int getGameId() {
        return gameId;
    }

    public void setGameId(int game_id) {
        this.gameId = game_id;
    }

    @Basic
    @Column(name = "is_minimum")
    public boolean isMinimum() {
        return isMinimum;
    }

    public void setMinimum(boolean minimum) {
        isMinimum = minimum;
    }

    @Basic
    @Column(name = "os")
    public String getOs() {
        return os;
    }

    public void setOs(String os) {
        this.os = os;
    }


    @Basic
    @Column(name = "processor")
    public String getProcessor() {
        return processor;
    }

    public void setProcessor(String processor) {
        this.processor = processor;
    }


    @Basic
    @Column(name = "memory")
    public String getMemory() {
        return memory;
    }

    public void setMemory(String memory) {
        this.memory = memory;
    }


    @Basic
    @Column(name = "graphic")
    public String getGraphics() {
        return graphic;
    }

    public void setGraphics(String graphic) {
        this.graphic = graphic;
    }
}
