package com.backend.domain.board;

import lombok.Data;

import java.util.List;

@Data
public class DeleteRequest {
    private List<Integer> ids;
    private Integer memberId;
}
