// DiaryCommentController.java
package com.backend.controller.diary;

import com.backend.domain.diary.DiaryComment;
import com.backend.service.diary.DiaryCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/diaryComment")
public class DiaryCommentController {
    private final DiaryCommentService service;

    @PostMapping("add")
    public ResponseEntity addComment(@RequestBody DiaryComment diaryComment,
                                     Authentication authentication) {
        if (service.validate(diaryComment)) {
            service.addComment(diaryComment, authentication);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("list/{id}")
    public List<DiaryComment> listComment(@PathVariable Integer id) {
        return service.listComment(id);
    }

    @DeleteMapping("diaryDelete")
    public ResponseEntity diaryDelete(@RequestBody DiaryComment diaryComment,
                                      Authentication authentication) {
        if (service.hasAccess(diaryComment, authentication)) {
            service.diaryDelete(diaryComment);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PutMapping("diaryUpdate")
    public ResponseEntity diaryUpdate(@RequestBody DiaryComment diaryComment
            , Authentication authentication) {
        if (service.validate(diaryComment)) {
            service.diaryUpdate(diaryComment);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("{id}")
    public DiaryComment getDiaryCommentById(@PathVariable Integer id) {
        return service.getById(id); // 반환 타입 추가
    }
}
