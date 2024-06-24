package com.backend.mapper.login;

import com.backend.domain.logIn.LogInInfo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface LoggedInMapper {

	@Select("SELECT * FROM logged_in WHERE member_nickname = #{memberNickname}")
	LogInInfo findByMemberNickname(@Param("memberNickname") String memberNickname);

	@Insert("""
        INSERT INTO logged_in (member_nickname, logged_in, logged_in_at)
        VALUES (#{memberNickname}, #{loggedIn}, CURRENT_TIMESTAMP)
        ON DUPLICATE KEY UPDATE 
            logged_in = VALUES(logged_in),
            logged_in_at = CURRENT_TIMESTAMP
    """)
	void upsertLoggedIn(LogInInfo logInInfo);
}
