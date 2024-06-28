package com.backend.mapper.friends;

import com.backend.domain.friends.FriendDto;
import com.backend.domain.member.Member;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface FriendsMapper {

	@Select("""
        SELECT m.id, m.nickname, COALESCE(lc.login_check, false) AS online
        FROM friends f
        JOIN member m ON f.friend_id = m.id
        LEFT JOIN login_check lc ON m.nickname = lc.member_nickname
        WHERE f.member_id = #{memberId}
    """)
	List<FriendDto> selectFriendsById(@Param("memberId") Integer memberId);

	@Insert("""
    INSERT INTO friends (member_id, friend_id, member_nickname, friend_nickname)
    VALUES (
        #{memberId},
        #{friendId},
        #{memberNickname},
        #{friendNickname}
    )
    ON DUPLICATE KEY UPDATE
        member_id = VALUES(member_id)
""")
	void insertFriend(@Param("memberId") Integer memberId, @Param("friendId") Integer friendId, @Param("memberNickname") String memberNickname, @Param("friendNickname") String friendNickname);

	@Select("""
        SELECT COUNT(*)
        FROM friends
        WHERE member_id = #{memberId} AND friend_id = #{friendId}
    """)
	int checkFriendship(@Param("memberId") Integer memberId, @Param("friendId") Integer friendId);

	@Select("""
        SELECT id, nickname
        FROM member
        WHERE id = #{id}
    """)
	Member selectMemberById(@Param("id") Integer id);

	@Delete("""
        DELETE FROM friends
        WHERE member_id = #{memberId} AND friend_id = #{friendId}
    """)
	void deleteFriend(@Param("memberId") Integer memberId, @Param("friendId") Integer friendId);
}
