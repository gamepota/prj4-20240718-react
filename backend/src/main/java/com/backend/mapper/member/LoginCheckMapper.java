package com.backend.mapper.member;

import com.backend.domain.member.LoginEntity;
import org.apache.ibatis.annotations.*;

@Mapper
public interface LoginCheckMapper {

    @Select("""
            SELECT *
            FROM login_check
            WHERE member_nickname = #{memberNickname}
            """)
    LoginEntity findByMemberNickname(@Param("memberNickname") String memberNickname);

    @Insert("""
                INSERT INTO login_check (member_nickname, login_check, login_logout_time)
                VALUES (#{memberNickname}, #{loginCheck}, CURRENT_TIMESTAMP)
                ON DUPLICATE KEY UPDATE
                    login_check = VALUES(login_check),
                    login_logout_time = CURRENT_TIMESTAMP
            """)
    void upsertLoginCheck(LoginEntity loginEntity);

    @Update("""
            UPDATE login_check
            SET login_check = false
            WHERE member_nickname = #{memberNickname}
            			""")
    void updatedLoginCheck(String memberNickname);
}