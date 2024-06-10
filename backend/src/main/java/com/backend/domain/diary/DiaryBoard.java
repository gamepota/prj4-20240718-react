package com.backend.domain.diary;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DiaryBoard {
    private Integer id;
    private String title;
    private String content;
    private String writer;
    private LocalDateTime inserted;
}
