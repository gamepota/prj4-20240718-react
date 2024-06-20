// DiaryCommentController.java
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
    private final DiaryCommentService service;

    @PostMapping("add")
    public void addComment(@RequestBody DiaryComment diaryComment) {
        service.addComment(diaryComment);
    }

    @GetMapping("list/{id}")
    public List<DiaryComment> listComment(@PathVariable Integer id) {
        return service.listComment(id);
    }

    @DeleteMapping("diaryDelete")
    public void diaryDelete(@RequestBody DiaryComment diaryComment) {
        service.diaryDelete(diaryComment);
    }

    @PutMapping("diaryUpdate")
    public void diaryUpdate(@RequestBody DiaryComment diaryComment) {
        service.diaryUpdate(diaryComment);
    }

    @GetMapping("{id}")
    public DiaryComment getDiaryCommentById(@PathVariable Integer id) {
        return service.getById(id); // 반환 타입 추가
    }
}
