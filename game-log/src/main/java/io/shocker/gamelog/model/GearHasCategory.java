package io.shocker.gamelog.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@IdClass(GearHasCategoryId.class)
@Table(name = "tbl_gear_has_tbl_gear_category")
public class GearHasCategory {
    @Id
    @Column(name = "tbl_gear_id")
    private int gearId;

    @Id
    @Column(name = "tbl_gear_category_id")
    private int categoryId;


    public int getGearId() {
        return gearId;
    }

    public void setGearId(int gearId) {
        this.gearId = gearId;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }
}


class GearHasCategoryId implements Serializable{
    private int gearId;
    private int categoryId;

}