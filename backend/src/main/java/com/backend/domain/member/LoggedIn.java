package com.backend.domain.member;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class LoggedIn {
    private Integer memberId;
    private boolean loggedIn;
    private LocalDateTime loggedInAt;
}
