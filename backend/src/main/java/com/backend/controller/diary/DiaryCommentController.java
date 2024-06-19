package com.backend.controller.diary;

import com.backend.domain.diary.DiaryComment;
import com.backend.service.diary.DiaryCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/diaryComment")
public class DiaryCommentController {

    private DiaryCommentService service;

    @PostMapping("add")
//    @PreAuthorize("isAuthenticated()")
    public void addComment(@RequestBody DiaryComment diaryComment
    ) {
//        if (service.validate(diaryComment)) {
        service.addComment(diaryComment);
//
//            return ResponseEntity.ok().build();
//        } else {
//            return ResponseEntity.badRequest().build();
//        }

    }

    @GetMapping("list/{diaryId}")
    public List<DiaryComment> listComment(@PathVariable Integer diaryId) {


        return service.listComment(diaryId);
    }

    @DeleteMapping("diaryDelete")
    public void diaryDelete(@RequestBody DiaryComment diaryComment
    ) {
//        if (service.hasAcess(diaryComment)) {
        service.diaryDelete(diaryComment);
//            return ResponseEntity.ok().build();
//        } else {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
//        }
    }

    @PutMapping("diaryUpdate")
//    @PreAuthorize("isAuthenticated()")
    public void diaryUpdate(@RequestBody DiaryComment diaryComment
    ) {
//        if (service.hasAcess(diaryComment, authentication)) {
        service.diaryUpdate(diaryComment);
//            return ResponseEntity.ok().build();
//        } else {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
//        }
    }

    @GetMapping("{id}")
    public void getDiaryCommentById(@PathVariable Integer id) {
        service.getById(id);
    }
}