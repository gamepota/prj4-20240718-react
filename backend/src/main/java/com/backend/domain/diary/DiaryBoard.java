package com.backend.domain.diary;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class DiaryBoard {
    private Integer id;
    private String title;
    private String content;
    private Integer memberId;
    private String nickName;
    private String username;
    private LocalDateTime inserted;

    private Integer numberOfImages;
    private List<String> imageSrcList;
}
