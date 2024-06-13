package com.backend.mapper.member;

import com.backend.domain.member.Member;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface MemberMapper {

    // MemberSignup
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
    Member selectByEmail(String email);

    @Select("""
            SELECT *
            FROM member
            WHERE nickname = #{nickname}
            """)
    Member selectByNickname(String nickname);

    // MemberList
    @Select("""
            SELECT *
            FROM member
            ORDER BY id ASC
            """)
    List<Member> selectAll();

    // MemberEdit
    @Update("""
                UPDATE member
                SET nickname = #{nickname},
                    password = #{password},
                    gender = #{gender},
                    nationality = #{nationality},
                    name = #{name},
                    birth_date = #{birthDate},
                    phone_number = #{phoneNumber},
                    address = #{address}
                WHERE id = #{id}
            """)
    int update(Member member);

    @Select("""
                    SELECT *
            FROM member WHERE id = #{id}
                """)
    Member selectByMemberId(Integer id);
}