package com.backend.controller.board;

import com.backend.domain.board.Board;
import com.backend.service.board.BoardService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class BoardController {
    final BoardService service;

    @PostMapping("add")
    public ResponseEntity add(Board board,
                              @RequestParam(value = "files[]", required = false)
                              MultipartFile[] files
    ) throws Exception {

        System.out.println("files = " + files);
        if (service.validate(board)) {

            service.add(board, files);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("list")
    public Map<String, Object> list(@RequestParam(defaultValue = "1") Integer page,
                                    @RequestParam(defaultValue = "30") Integer pageAmount,
                                    @RequestParam(defaultValue = "false") Boolean offsetReset,
                                    HttpSession session) throws Exception {
//        System.out.println("page = " + page);
        return service.list(page, pageAmount, offsetReset, session);
    }

    @GetMapping("{id}")
    public Board get(@PathVariable Integer id) {
        return service.get(id);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Integer id) {
        
        service.delete(id);
    }

    @PutMapping("edit")
    public ResponseEntity edit(@RequestBody Board board,
                               @RequestParam(value = "removeFileList[]", required = false)
                               List<String> removeFileList,
                               MultipartFile[] addFileList
    ) throws Exception {

        if (service.validate(board)) {
            service.edit(board, removeFileList, addFileList);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

}

