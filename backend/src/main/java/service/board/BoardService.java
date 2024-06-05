package service.board;

import domain.Board;
import lombok.RequiredArgsConstructor;
import mapper.BoardMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class BoardService {
    BoardMapper mapper;

    public void add(Board board) {
        mapper.insert(board);

    }
}
