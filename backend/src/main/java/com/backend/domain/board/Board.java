package com.backend.domain.board;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class Board {
    private Integer id;
    private String title;
    private String content;
    private String writer;
    private Integer memberId;
    private LocalDateTime inserted;
    private Integer views;
    private String boardType;
    private String repoterId;
    private String repoterNickname;

    private Integer numberOfReports;
    private Integer numberOfImages;
    private Integer numberOfComments;
    private Integer numberOfLikes;
    private List<BoardFile> fileList;

}
