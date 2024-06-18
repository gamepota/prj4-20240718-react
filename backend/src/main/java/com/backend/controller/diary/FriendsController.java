package com.backend.controller.diary;

import com.backend.domain.diary.Friend;
import com.backend.service.diary.FriendService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/friends")
public class FriendsController {

    final FriendService service;

    @PostMapping("add")
    public Friend addFriend(@RequestParam Integer friendId) {
        return service.addFriend(friendId);
    }
}
