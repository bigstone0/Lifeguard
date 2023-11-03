package com.sds.lifeguard_server.controller;

import com.sds.lifeguard_server.domain.Member;
import com.sds.lifeguard_server.domain.User;
import com.sds.lifeguard_server.DTO.*;
import com.sds.lifeguard_server.mapper.*;
import com.sds.lifeguard_server.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
public class MemberController {
    private MemberService memberService;
    private final MemberMapper memberMapper;
    private final UserMapper userMapper;

    @GetMapping("/sign/memberSignUp")
    public void signup(@RequestParam String id, @RequestParam String pw, @RequestParam String name, @RequestParam String phone, @RequestParam String email) {
        MemberDTO member=new MemberDTO();
        member.setMember_id(id);
        member.setMember_pw(pw);
        member.setMember_name(name);
        member.setMember_phone(phone);
        member.setMember_email(email);
        member.setCreated_at(LocalDateTime.now());

        Member memberEntity= Member.builder()
                .id(member.getMember_id())
                .pw(member.getMember_pw())
                .name(member.getMember_name())
                .phone(member.getMember_phone())
                .email(member.getMember_email())
                .created_at(member.getCreated_at())
                .updated_at(member.getUpdated_at())
                .build();

        memberMapper.insertMember(memberEntity);
    }

    @GetMapping("/sign/userSignUp")
    public void usersignup(@RequestParam String id, @RequestParam String pw, @RequestParam String name, @RequestParam String phone, @RequestParam String email) {
        UserDTO user=new UserDTO();
        user.setUser_id(id);
        user.setUser_pw(pw);
        user.setUser_name(name);
        user.setUser_phone(phone);
        user.setUser_email(email);
        user.setCreated_at(LocalDateTime.now());

        User userEntity= User.builder()
                .id(user.getUser_id())
                .pw(user.getUser_pw())
                .name(user.getUser_name())
                .phone(user.getUser_phone())
                .email(user.getUser_email())
                .created_at(user.getCreated_at())
                .updated_at(user.getUpdated_at())
                .build();

        userMapper.insertUser(userEntity);
    }
}
