package com.backend.mapper.friends;

import com.backend.domain.member.Member;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface FriendsMapper {

	@Select("""
        SELECT m.id, m.nickname
        FROM friends f
        JOIN member m ON f.friend_id = m.id
        WHERE f.member_nickname = #{nickname}
    """)
	List<Member> selectFriendsByNickname(@Param("nickname") String nickname);

	@Insert("""
        INSERT INTO friends (member_id, friend_id, member_nickname, friend_nickname) 
        VALUES (
            (SELECT id FROM member WHERE nickname = #{memberNickname}),
            (SELECT id FROM member WHERE nickname = #{friendNickname}),
            #{memberNickname},
            #{friendNickname}
        )
    """)
	void insertFriend(@Param("memberNickname") String memberNickname, @Param("friendNickname") String friendNickname);
}
