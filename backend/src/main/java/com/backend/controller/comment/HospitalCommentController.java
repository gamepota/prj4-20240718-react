package com.backend.controller.comment;

import com.backend.domain.comment.HospitalComment;
import com.backend.service.comment.HospitalCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hospitalComment")
@RequiredArgsConstructor
public class HospitalCommentController {

    final HospitalCommentService service;

    @PostMapping("add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Object> addComment(@RequestBody HospitalComment hospitalComment,
                                             Authentication authentication) {
        if (service.validate(hospitalComment)) {
            service.add(hospitalComment, authentication);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }

    }

    @GetMapping("list/{hospitalId}")
    public List<HospitalComment> list(@PathVariable Integer hospitalId) {


        return service.list(hospitalId);
    }

    @DeleteMapping("remove")
    public ResponseEntity remove(@RequestBody HospitalComment hospitalComment,
                                 Authentication authentication) {
        if (service.hasAccess(hospitalComment, authentication)) {
            service.remove(hospitalComment);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PutMapping("edit")
    public void edit(@RequestBody HospitalComment hospitalComment,
                     Authentication authentication) {
        service.edit(hospitalComment);
    }
}
