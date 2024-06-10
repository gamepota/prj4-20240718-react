package com.backend.controller.diary;

import com.backend.domain.diary.DiaryBoard;
import com.backend.service.diary.DiaryBoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diaryBoard")
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
        DiaryBoard board = service.get(id);

        if (board == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().body(board);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Integer id) {
        service.remove(id);
    }
}
