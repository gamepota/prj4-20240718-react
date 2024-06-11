package com.backend.controller.place;

import com.backend.domain.place.HospitalComment;
import com.backend.service.place.HospitalCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/comment")
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
