package com.backend.diary.controller;

import com.backend.diary.domain.DiaryBoard;
import com.backend.diary.service.DiaryBoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/DiaryBoard")
@RequiredArgsConstructor
public class DiaryBoardController {

    private final DiaryBoardService service;

    @PostMapping("add")
    public ResponseEntity add(@RequestBody DiaryBoard diaryBoard) {
        if (service.validate(diaryBoard)) {
            service.add(diaryBoard);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }


    }

    @GetMapping("list")
    public List<DiaryBoard> list() {
        return service.list();
    }

    @GetMapping("{id}")
    public ResponseEntity get(@PathVariable Integer id) {
        DiaryBoard diaryBoard = service.get(id);

        if (diaryBoard == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(diaryBoard);
        }
    }

}
