package com.sds.lifeguard_server.service;

import com.sds.lifeguard_server.domain.Member;
import com.sds.lifeguard_server.mapper.MemberMapper;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    private final MemberMapper memberMapper;

    public MemberService(MemberMapper memberMapper) {
        this.memberMapper = memberMapper;
    }

    public void insertMember(Member member){
        System.out.println(member.getMember_id());
        memberMapper.insertMember(member);
    }
}
