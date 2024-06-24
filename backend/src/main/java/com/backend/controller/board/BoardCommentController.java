package com.backend.controller.board;

import com.backend.domain.board.BoardComment;
import com.backend.service.board.BoardCommentServivce;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment")
public class BoardCommentController {
    final BoardCommentServivce service;

    @PostMapping("add")
//    @PreAuthorize("isAuthenticated()")
    public ResponseEntity addComment(@RequestBody BoardComment comment /*Authentication authentication*/) {
        if (service.validate(comment)) {
            System.out.println("이것은 validate 통과한 comment = " + comment);
            service.add(comment /*authentication*/);

            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }

    }

    @GetMapping("list/{boardId}")
    public List<BoardComment> listComment(@PathVariable Integer boardId) {
//        System.out.println("이것은 comment의 get요청 boardId = " + boardId);
        return service.list(boardId);
    }

    @DeleteMapping("remove")
    public ResponseEntity removeComment(@RequestBody BoardComment boardComment) {
        System.out.println("컨트롤러의 comment = " + boardComment);
        service.remove(boardComment);
        return ResponseEntity.ok().build();

    }

    @PutMapping("edit")
    public ResponseEntity editComment(@RequestBody BoardComment comment) {
        service.update(comment);
        return ResponseEntity.ok().build();
    }

}
