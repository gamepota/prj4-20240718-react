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
            JOIN member m ON f.friend_nickname = m.nickname
            WHERE f.member_nickname = #{nickname}
            """)
	List<Member> selectFriendsByNickname(@Param("nickname") String nickname);
}

