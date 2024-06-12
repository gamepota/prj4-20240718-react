package com.backend.controller.comment;

import com.backend.domain.comment.HospitalComment;
import com.backend.service.comment.HospitalCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/hospitalComment")
@RequiredArgsConstructor
public class HospitalCommentController {

    final HospitalCommentService service;

    @PostMapping("add")
    @PreAuthorize("isAuthenticated()")
    public void addComment(@RequestBody HospitalComment hospitalComment,
                           Authentication authentication) {
        service.add(hospitalComment, authentication);

    }
}
