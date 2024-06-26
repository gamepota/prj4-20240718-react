package com.backend.domain.board;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BoardComment {
    private Integer id;
    private Integer boardId;
    private Integer memberId;
    private String boardComment;
    private LocalDateTime inserted;
//
//    public String getInserted() {
//        LocalDateTime beforeOneDay = LocalDateTime.now().minusDays(1);
//
//        if (inserted.isBefore(beforeOneDay)) {
//            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//            return inserted.format(formatter).toString();
//        } else {
//            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
//            return inserted.format(formatter).toString();
//        }
//    }
}
