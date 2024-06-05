package com.backend.diary.controller;

import com.backend.diary.domain.diaryBoard;
import com.backend.diary.service.diaryBoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/diaryBoard")
@RequiredArgsConstructor
public class diaryBoardController {

    private final diaryBoardService service;

    @PostMapping("add")
    public void add(@RequestBody diaryBoard diaryBoard) {

        service.add(diaryBoard);

    }

}
