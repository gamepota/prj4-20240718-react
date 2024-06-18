package com.backend.service.diary;

import com.backend.domain.diary.Friend;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FriendService {

    final mapper FriendMapper mapper;

    public Friend addFriend(Integer friendId) {
       return mapper.addFriend(friendId);
    }
}
