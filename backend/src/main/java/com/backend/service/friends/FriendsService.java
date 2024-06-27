package com.backend.service.friends;

import com.backend.domain.friends.FriendRequest;
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

	public List<Member> getFriendsWithIds(int memberId) {
		return friendsMapper.selectFriendsById(memberId);
	}

	public void addFriend(FriendRequest friendRequest) {
		Member member = friendsMapper.selectMemberById(friendRequest.getMemberId());
		Member friend = friendsMapper.selectMemberById(friendRequest.getFriendId());

		friendsMapper.insertFriend(friendRequest.getMemberId(), friendRequest.getFriendId(), member.getNickname(), friend.getNickname());
		friendsMapper.insertFriend(friendRequest.getFriendId(), friendRequest.getMemberId(), friend.getNickname(), member.getNickname());
	}

	public boolean checkFriendship(int memberId, int friendId) {
		return friendsMapper.checkFriendship(memberId, friendId) > 0;
	}
}
