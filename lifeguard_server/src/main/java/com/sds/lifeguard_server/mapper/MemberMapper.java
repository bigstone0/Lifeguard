package com.sds.lifeguard_server.mapper;

import com.sds.lifeguard_server.domain.Member;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {
    @Insert("insert into member values(#{member_id},#{created_at},#{member_email},#{member_name},#{member_phone},#{member_pw},#{updated_at})")
    void insertMember(Member member);
}
