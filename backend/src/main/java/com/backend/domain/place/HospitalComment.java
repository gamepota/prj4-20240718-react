package com.backend.domain.place;

import lombok.Data;

import java.time.LocalDate;

@Data
public class HospitalComment {
    private Integer id;
    private String hospitalId;
    private String memberId;
    private String comment;
    private LocalDate inserted;

    public void setMemberId(Integer integer) {

    }
}
