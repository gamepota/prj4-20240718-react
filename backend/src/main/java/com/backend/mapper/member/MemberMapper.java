package com.backend.mapper.member;

import com.backend.domain.member.Member;
import org.apache.ibatis.annotations.*;

import java.time.LocalDateTime;
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

    // MemberList
    @Select("""
            SELECT *
            FROM member
            ORDER BY id ASC
            """)
    List<Member> selectAll();

    // MemberEdit
    @Select("""
            SELECT *
            FROM member
            WHERE id = #{id}
            """)
    Member selectByMemberId(Integer id);

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

    // MemberDelete
    @Delete("""
            DELETE FROM member
            WHERE id = #{id}
            """)
    int deleteById(Integer id);

    // logged_in
    @Insert("""
            INSERT INTO logged_in(member_id, logged_in, logged_in_at)
            VALUES (#{memberId}, #{loggedIn}, #{loggedInAt})
            ON DUPLICATE KEY UPDATE
            logged_in = VALUES(logged_in),
            logged_in_at = VALUES(logged_in_at)
            """)
    int updateLoginStatus(@Param("memberId") Integer memberId, @Param("loggedIn") boolean loggedIn, @Param("loggedInAt") LocalDateTime now);

    // HospitalCommentWrite
    @Select("""
            SELECT id, username
            FROM member
            WHERE username = #{username}
            """)
    Member detectByUsername(String username);

    // DiaryBoard
    @Select("""
            SELECT id,nickname
            FROM member
            WHERE nickname = #{nickname}
            """)
    Member selectByDiaryName(String nickname);
}
