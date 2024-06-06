package com.backend.diary.controller;

import com.backend.diary.domain.diaryBoard;
import com.backend.diary.service.diaryBoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diaryBoard")
@RequiredArgsConstructor
public class diaryBoardController {

    private final diaryBoardService service;

    @PostMapping("add")
    public ResponseEntity add(@RequestBody diaryBoard diaryBoard) {
        if (service.validate(diaryBoard)) {
            service.add(diaryBoard);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }


    }

    @GetMapping("list")
    public List<diaryBoard> diaryList() {
        return service.diaryList();
    }

}
