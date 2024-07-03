package com.backend.controller.diary;

import com.backend.domain.diary.DiaryComment;
import com.backend.service.diary.DiaryCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/diaryComment")
public class DiaryCommentController {
    private final DiaryCommentService service;

    @PostMapping("/add")
    public ResponseEntity add(@RequestBody DiaryComment diaryComment,
                              Authentication authentication) {
        if (service.validate(diaryComment)) {
            service.add(diaryComment, authentication);
            System.out.println("diaryComment = " + diaryComment);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> list(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize) {
        Map<String, Object> response = service.list(page, pageSize);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity diaryDelete(@PathVariable Integer id, @RequestParam(required = false) Integer memberId,
                                      Authentication authentication) {
        if (service.hasAccess(id, authentication, memberId)) {
            service.diaryDelete(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PutMapping("/edit")
    public ResponseEntity edit(@RequestBody DiaryComment diaryComment
            , Authentication authentication) {
        if (service.validate(diaryComment)) {
            service.edit(diaryComment);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity get(@PathVariable Integer id) {
        DiaryComment diaryComment = service.get(id);

        if (diaryComment == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(diaryComment); // 반환 타입 추가
    }
}
