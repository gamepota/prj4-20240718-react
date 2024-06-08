package com.backend.domain.member;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class Member {
    Integer id;
    String name;
    String email;
    String password;
    String nickname;
    String gender;
    String nationality;
    LocalDate birthDate;
    String phoneNumber;
    String address;
    LocalDateTime inserted;
}
