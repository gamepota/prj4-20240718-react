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
        WHERE f.member_id = #{memberId}
    """)
	List<Member> selectFriendsById(@Param("memberId") int memberId);

	@Insert("""
        INSERT INTO friends (member_id, friend_id, member_nickname, friend_nickname)
        VALUES (
            #{memberId},
            #{friendId},
            #{memberNickname},
            #{friendNickname}
        )
    """)
	void insertFriend(@Param("memberId") int memberId, @Param("friendId") int friendId, @Param("memberNickname") String memberNickname, @Param("friendNickname") String friendNickname);

	@Select("""
        SELECT COUNT(*)
        FROM friends
        WHERE member_id = #{memberId} AND friend_id = #{friendId}
    """)
	int checkFriendship(@Param("memberId") int memberId, @Param("friendId") int friendId);

	@Select("""
        SELECT id, nickname
        FROM member
        WHERE id = #{id}
    """)
	Member selectMemberById(@Param("id") int id);
}
