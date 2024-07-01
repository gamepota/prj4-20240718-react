package com.backend.service.friends;

import com.backend.domain.friends.FriendDto;
import com.backend.domain.friends.FriendRequest;
import com.backend.domain.member.Member;
import com.backend.mapper.friends.FriendsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FriendsService {

	private final FriendsMapper friendsMapper;
	private static final Logger logger = LoggerFactory.getLogger(FriendsService.class);

	public FriendsService(FriendsMapper friendsMapper) {
		this.friendsMapper = friendsMapper;
	}

	public List<FriendDto> getFriendsWithIds(Integer memberId) {
		logger.info("Fetching friends with IDs for member ID: {}", memberId);
		List<FriendDto> friends = friendsMapper.selectFriendsById(memberId);
		logger.info("Fetched friends: {}", friends);
		return friends;
	}

	public void addFriend(FriendRequest friendRequest) {
		Member member = friendsMapper.selectMemberById(friendRequest.getMemberId());
		Member friend = friendsMapper.selectMemberById(friendRequest.getFriendId());

		friendsMapper.insertFriend(friendRequest.getMemberId(), friendRequest.getFriendId(), member.getNickname(), friend.getNickname());
		friendsMapper.insertFriend(friendRequest.getFriendId(), friendRequest.getMemberId(), friend.getNickname(), member.getNickname());
	}

	public boolean checkFriendship(Integer memberId, Integer friendId) {
		return friendsMapper.checkFriendship(memberId, friendId) > 0;
	}

	public void deleteFriend(Integer memberId, Integer friendId) {
		friendsMapper.deleteFriend(memberId, friendId);
	}
}
