package com.backend.Controller;

import com.backend.domain.diaryBoard;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/diaryBoard")
public class diaryController {

    @PostMapping("add")
    public void add(@RequestBody diaryBoard diaryBoard) {
        System.out.println("diaryBoard = " + diaryBoard);

    }

}
