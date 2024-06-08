package com.backend.mapper.member;

import com.backend.domain.member.Member;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface MemberMapper {
    @Insert("""
            INSERT INTO member(name, email, nickname, password, gender, nationality, birth_date, phone_number, address)
            VALUES (#{name}, #{email}, #{nickname}, #{password}, #{gender}, #{nationality}, #{birthDate}, #{phoneNumber}, #{address})
            """
    )
    public int signup(Member member);


    @Select("""
            SELECT *
            FROM member
            WHERE email = #{email}
            """)
    Member getEmail(String email);

    @Select("""
            SELECT *
            FROM member
            WHERE nickname = #{nickname}
            """)
    Member getNickname(String nickname);
}