package com.backend.controller.diary;

import com.backend.domain.diary.DiaryBoard;
import com.backend.service.diary.DiaryBoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/diaryBoard")
@RequiredArgsConstructor
public class DiaryBoardController {

    private final DiaryBoardService service;

    @PostMapping("add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity add(DiaryBoard diaryBoard, Authentication authentication,
                              @RequestParam(value = "files[]", required = false) MultipartFile[] files) {
        if (service.validate(diaryBoard)) {
            service.add(diaryBoard, files, authentication);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("list")
    public Map<String, Object> list(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(value = "type", required = false) String searchType,
            @RequestParam(value = "keyword", defaultValue = "") String keyword) {

        return service.list(page, searchType, keyword);
    }

    @GetMapping("{id}")
    public ResponseEntity get(@PathVariable Integer id) {
        DiaryBoard diaryBoard = service.get(id);

        if (diaryBoard == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().body(diaryBoard);
    }

    @DeleteMapping("{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity delete(@PathVariable Integer id,
                                 Authentication authentication) {
        if (service.hasAccess(id, authentication)) {
            service.remove(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @PutMapping("edit")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity edit(@RequestBody DiaryBoard diaryBoard,
                               Authentication authentication) {
        if (service.hasAccess(diaryBoard.getId(), authentication)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        if (service.validate(diaryBoard)) {
            service.edit(diaryBoard);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }

    }
}
