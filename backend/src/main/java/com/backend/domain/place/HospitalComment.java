package com.backend.domain.place;

import lombok.Data;

import java.time.LocalDate;

@Data
public class HospitalComment {
    private Integer id;
    private Integer hospitalId;
    private Integer memberId;
    private String comment;
    private String username;
    private LocalDate inserted;
    private String nickname;


}


