package com.backend.domain.member;

import lombok.Getter;

@Getter
public enum Role {
    ADMIN("ROLE_ADMIN"),
    USER("ROLE_USER");

    private String value;

    Role(String value) {
        this.value = value;
    }
}
