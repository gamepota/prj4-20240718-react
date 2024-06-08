package com.backend.domain.member;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class Member {
    private Integer id;
    private String name;
    private String email;
    private String password;
    private String nickname;
    private String gender;
    private String nationality;
    private LocalDate birthDate;
    private String phoneNumber;
    private String address;
    private LocalDateTime inserted;
}
