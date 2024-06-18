package com.backend.domain.diary;

import lombok.Data;

@Data
public class Friend {
    private Integer id;
    private Integer memberId;
    private Integer friendId;
}
