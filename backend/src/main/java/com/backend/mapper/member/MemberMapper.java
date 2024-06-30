package com.backend.mapper.member;

import com.backend.domain.member.Member;
import org.apache.ibatis.annotations.*;

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
            LIMIT #{limit} OFFSET #{offset}
            """)
    List<Member> selectAll(@Param("limit") int limit, @Param("offset") int offset);

    @Select("""
            SELECT COUNT(*)
            FROM member
            """)
    int countAllMembers();

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

    // MemberFind
    @Update("""
            UPDATE member
            SET password = #{password}
            WHERE username = #{username}
            """)
    void updatePasswordByEmail(String username, String password);

    // OAuth2
    @Insert("""
            INSERT INTO member(username, name, role)
            VALUES (#{username}, #{name}, #{role})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insertMember(Member member);

    @Update("""
            UPDATE member
            SET username = #{username},
                name = #{name}
            WHERE username = #{username}
            """)
    int updateMember(Member member);

    // DiaryBoard
    @Select("""
            SELECT id,nickname
            FROM member
            WHERE nickname = #{nickname}
            """)
    Member selectByDiaryName(String nickname);

    @Select("""
                SELECT id,nickname
                FROM member
                WHERE nickname = #{nickname}
            """)
    Member selectByDiaryCommentName(String nickname);
}
