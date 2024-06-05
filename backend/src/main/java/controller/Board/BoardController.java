package controller.Board;

import domain.Board;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import service.board.BoardService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class BoardController {
    BoardService service;

    @PostMapping("add")
    public void add(@RequestBody Board board) {
        System.out.println("board = " + board);
        service.add(board);
    }
}
