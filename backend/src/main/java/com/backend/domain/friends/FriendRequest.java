package com.backend.domain.friends;

import lombok.Data;

@Data
public class FriendRequest {
	private int memberId;
	private int friendId;
}
