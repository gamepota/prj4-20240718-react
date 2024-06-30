package com.backend.mapper.member;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface EmailMapper {

    @Update("""
            UPDATE member
            SET password = #{password}
            WHERE username = #{username}
            """)
    void updatePasswordByEmail(@Param("username") String username, @Param("password") String password);
}
