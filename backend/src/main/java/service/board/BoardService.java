package service.board;

import lombok.RequiredArgsConstructor;
import mapper.BoardMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class BoardService {
    BoardMapper mapper;

    public void add(String title, String content, String writer) {
        mapper.insert(title, content, writer);

    }
}
