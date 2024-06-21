package com.backend.domain.diary;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class DiaryBoard {
    private Integer id;
    private String title;
    private String content;
    private String nickname;
    private String username;
    private String writer;
    private Integer memberId;
    private LocalDateTime inserted;

    private Integer numberOfImages;
    private List<String> imageSrcList;

    private List<DiaryBoardFile> fileList;


}
