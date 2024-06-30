package com.backend.domain.member;

import lombok.Data;

@Data
public class OAuth2Member {
    private String role;
    private String name;
    private String username;
}
