package com.backend.controller.diary;

import com.backend.domain.diary.DiaryComment;
import com.backend.service.diary.DiaryCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/diaryComment")
public class DiaryCommentController {

    private DiaryCommentService service;

    @PostMapping("add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity addComment(@RequestBody DiaryComment diaryComment,
                                     Authentication authentication) {
        if (service.validate(diaryComment)) {
            service.addComment(diaryComment, authentication);

            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }

    }

    @GetMapping("list/{boardId}")
    public List<DiaryComment> listComment(@PathVariable Integer boardId) {


        return service.listComment(boardId);
    }

    @DeleteMapping("diaryDelete")
    public void diaryDelete(@RequestBody DiaryComment diaryComment) {
        service.diaryDelete(diaryComment);
    }

}
