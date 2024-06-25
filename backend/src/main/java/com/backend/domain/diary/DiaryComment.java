package com.backend.domain.diary;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DiaryComment {
    private Integer id;
    private String comment;
    private Integer memberId;
    private String nickname;
    private LocalDateTime inserted;


}
