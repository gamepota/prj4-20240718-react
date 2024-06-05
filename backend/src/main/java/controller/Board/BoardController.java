package controller.Board;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import service.board.BoardService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class BoardController {
    BoardService service;

    @PostMapping("/add")
    public void add(@RequestParam String title, @RequestParam String content, @RequestParam String writer) {
        service.add(title, content, writer);
    }
}
