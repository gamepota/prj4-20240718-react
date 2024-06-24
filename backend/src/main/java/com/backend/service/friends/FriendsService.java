package com.backend.service.friends;

import com.backend.domain.member.Member;
import com.backend.mapper.friends.FriendsMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FriendsService {

	private final FriendsMapper friendsMapper;

	public FriendsService(FriendsMapper friendsMapper) {
		this.friendsMapper = friendsMapper;
	}

	public List<Member> getFriendsWithNicknames(String nickname) {
		return friendsMapper.selectFriendsByNickname(nickname);
	}
}
