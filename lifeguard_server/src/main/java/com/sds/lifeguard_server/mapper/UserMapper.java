package com.sds.lifeguard_server.mapper;

import com.sds.lifeguard_server.domain.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    @Insert("insert into user values(#{user_id},#{created_at},#{updated_at},#{user_email},#{user_name},#{user_phone},#{user_pw})")
    void insertUser(User user);
}
