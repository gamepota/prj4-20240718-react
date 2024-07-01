package com.backend.domain.board;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardReport {
    private Integer boardId;
    private Integer memberId;
    private String reporter;
    private String reportType;
    private String content;

}
