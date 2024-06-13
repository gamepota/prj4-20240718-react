package com.backend.controller.diary;

import com.backend.domain.diary.DiaryComment;
import com.backend.service.diary.DiaryCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/diaryComment")
public class DiaryCommentController {

    private DiaryCommentService service;

    @PostMapping("add")
    @PreAuthorize("isAuthenticated()")
    public void addComment(@RequestBody DiaryComment diaryComment,
                           Authentication authentication) {
        service.addComment(diaryComment, authentication);
    }


}
