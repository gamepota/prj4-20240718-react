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
            INSERT INTO member(name, username, nickname, password, gender, nationality, birth_date, phone_number, postcode, main_address, detailed_address)
            VALUES (#{name}, #{username}, #{nickname}, #{password}, #{gender}, #{nationality}, #{birthDate}, #{phoneNumber}, #{postcode}, #{mainAddress}, #{detailedAddress})
            """
    )
    public int signup(Member member);

    @Select("""
            SELECT *
            FROM member
            WHERE username = #{username}
            """)
    Member selectByUsername(String username);

    @Select("""
            SELECT *
            FROM member
            WHERE nickname = #{nickname}
            """)
    Member selectByNickname(String nickname);

    // MemberLogin
    @Select("""
            SELECT COUNT(*)
            FROM member
            WHERE username = #{username}
            """)
    Boolean existsByUsername(String username);

    @Select("""
            SELECT *
            FROM member
            WHERE username = #{username}
            """)
    Member findByUsername(String username);

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
                    postcode = #{postcode},
                    main_address = #{mainAddress},
                    detailed_address = #{detailedAddress}
                WHERE id = #{id}
            """)
    int update(Member member);

    @Select("""
                    SELECT *
            FROM member WHERE id = #{id}
                """)
    Member selectByMemberId(Integer id);

    @Select("""
            SELECT id, username
            FROM member
            WHERE username = #{username}
            """)
    Member detectByUsername(String username);
}