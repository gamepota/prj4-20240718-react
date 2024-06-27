package com.backend.service.board;

import com.backend.domain.board.BoardComment;
import com.backend.mapper.board.BoardCommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class BoardCommentServivce {

    final BoardCommentMapper mapper;

    public boolean validate(BoardComment comment) {
        if (comment == null) {
            return false;
        }
        if (comment.getBoardComment().isBlank()) {
            return false;
        }

        if (comment.getBoardId() == null) {
            return false;
        }

        return true;
    }

    public void add(BoardComment comment) {
        mapper.insert(comment);
    }

    public List<BoardComment> list(Integer boardId) {
        return mapper.selectAllByBoardId(boardId);
    }

    public void remove(BoardComment comment) {
        mapper.deleteById(comment.getId());
    }

    public void update(BoardComment boardComment) {
        System.out.println("서비스의 boardComment = " + boardComment);
        mapper.update(boardComment);
    }
}
