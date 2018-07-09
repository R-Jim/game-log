package io.shocker.gamelog.model;

import javax.persistence.*;

@Entity
@Table(name = "tbl_user")
public class User {
    @Id
    @Column(name = "username")
    private String username;

    @Basic
    @Column(name = "password")
    private String password;

    @Basic
    @Column(name = "tbl_role_id")
    private int roleId;


    public String getUsername() {
        return username;
    }

    public int getRoleId() {
        return roleId;
    }
}
