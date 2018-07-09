package io.shocker.gamelog.model;

import javax.persistence.*;

@Entity
@Table(name = "tbl_user")
public class User {
    @Id
    @Column(name = "username")
    private String username;
    private String password;
    private int roleId;


    public String getUsername() {
        return username;
    }

    @Basic
    @Column(name = "password")
    public String getPassword() {
        return password;
    }

    @Basic
    @Column(name = "tbl_role_id")
    public int getRoleId() {
        return roleId;
    }
}
