package com.backend.domain.member;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class Member {
    private Integer id;
    private String name;
    private String username;
    private String nickname;
    private String password;
    private String gender;
    private String nationality;
    private LocalDate birthDate;
    private String phoneNumber;
    private Integer postcode;
    private String mainAddress;
    private String detailedAddress;
    private LocalDateTime inserted;
    private Role role;
}
