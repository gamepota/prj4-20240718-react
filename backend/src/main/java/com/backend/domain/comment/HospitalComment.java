package com.backend.domain.comment;

import lombok.Data;

import java.time.LocalDate;

@Data
public class HospitalComment {
    private Integer id;
    private Integer hospitalId;
    private Integer memberId;
    private String comment;
    private LocalDate inserted;


}
