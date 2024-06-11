package com.backend.service.board;

import com.backend.domain.board.Board;
import com.backend.mapper.board.BoardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class BoardService {
    final BoardMapper mapper;

    public void add(Board board) {
        mapper.insert(board);

    }

    public boolean validate(Board board) throws Exception {
        if (board.getTitle() == null || board.getTitle().isBlank()) {
            return false;
        }
        if (board.getContent() == null || board.getContent().isBlank()) {
            return false;
        }
        if (board.getWriter() == null || board.getWriter().isBlank()) {
            return false;
        }
        return true;
    }

    public List<Board> list(Integer pageAmount, Integer currentPage) throws Exception {
        Integer offset = ((currentPage - 1) * pageAmount);
        return mapper.selectAll(offset, pageAmount);
    }


    public Board get(Integer id) {
        return mapper.selectById(id);
    }

    public void delete(Integer id) {
        mapper.deleteById(id);
    }

    public void edit(Board board) {
        mapper.update(board);
    }
}
