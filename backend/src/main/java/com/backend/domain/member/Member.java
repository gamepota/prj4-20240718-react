package com.backend.domain.member;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class Member {
    Integer id;
    String name;
    String email;
    String nickname;
    String password;
    String gender;
    String nationality;
    LocalDate birthDate;
    String phoneNumber;
    String address;
    LocalDateTime inserted;
}
