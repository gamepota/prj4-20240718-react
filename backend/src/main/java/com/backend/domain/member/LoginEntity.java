package com.backend.domain.member;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class LoginEntity {
    private String memberNickname;
    private boolean loginCheck;
    private Timestamp loginLogoutTime;
}
