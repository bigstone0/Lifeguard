package com.sds.lifeguard_server.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name="member")
@Getter
@ToString
@NoArgsConstructor
public class Member {
    @Id
    @Column(name = "member_id",length = 50)
    private String member_id;

    @Column(name = "member_pw",nullable = false,length = 50)
    private String member_pw;

    @Column(name = "member_name",nullable = false,length = 50)
    private String member_name;

    @Column(name="member_phone",nullable = false)
    private String member_phone;

    @Column(name="member_email",nullable = false)
    private String member_email;

    @Column(name="created_at")
    private LocalDateTime created_at;

    @Column(name="updated_at")
    private LocalDateTime updated_at;

    @Builder
    public Member(String id, String pw, String name, String phone, String email, LocalDateTime created_at, LocalDateTime updated_at){
        this.member_id=id;
        this.member_pw=pw;
        this.member_name=name;
        this.member_phone=phone;
        this.member_email=email;
        this.created_at=created_at;
        this.updated_at=updated_at;
    }
}
