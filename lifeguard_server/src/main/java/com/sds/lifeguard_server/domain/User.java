package com.sds.lifeguard_server.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name="user")
@Getter
@ToString
@NoArgsConstructor
public class User {
    @Id
    @Column(name = "user_id",length = 50)
    private String user_id;

    @Column(name = "user_pw",nullable = false,length = 50)
    private String user_pw;

    @Column(name = "user_name",nullable = false,length = 50)
    private String user_name;

    @Column(name="user_phone",nullable = false)
    private String user_phone;

    @Column(name="user_email",nullable = false)
    private String user_email;

    @Column(name="created_at")
    private LocalDateTime created_at;

    @Column(name="updated_at")
    private LocalDateTime updated_at;

    @Builder
    public User(String id, String pw, String name, String phone, String email, LocalDateTime created_at, LocalDateTime updated_at){
        this.user_id=id;
        this.user_pw=pw;
        this.user_name=name;
        this.user_phone=phone;
        this.user_email=email;
        this.created_at=created_at;
        this.updated_at=updated_at;
    }
}

