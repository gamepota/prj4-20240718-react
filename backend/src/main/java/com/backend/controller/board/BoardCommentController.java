package com.backend.controller.board;

import com.backend.domain.board.BoardComment;
import com.backend.service.board.BoardCommentServivce;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
