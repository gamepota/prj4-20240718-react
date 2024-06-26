package com.backend.domain.member;

import lombok.Data;

@Data
public class Profile {
    private Integer id;
    private Integer memberId;
    private String fileName;
    private String uploadPath;
}
