package com.backend.domain.diary;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class DiaryBoard {
    private Integer id;
    private String title;
    private String content;
    private String writer;
    private Integer memberId;
    private String nick_name;
    private LocalDateTime inserted;

    private Integer numberOfImages;
    private List<String> imageSrcList;
}
