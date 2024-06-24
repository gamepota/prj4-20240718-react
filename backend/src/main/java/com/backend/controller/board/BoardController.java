package com.backend.controller.board;

import com.backend.domain.board.Board;
import com.backend.service.board.BoardService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.DefaultAuthenticationEventPublisher;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class BoardController {
    final BoardService service;
    private final DefaultAuthenticationEventPublisher authenticationEventPublisher;

    @PostMapping("add")
    public ResponseEntity add(Board board,
                              @RequestParam(value = "files[]", required = false)
                              MultipartFile[] files

    ) throws Exception {
        System.out.println("이것은 Post요청 board = " + board);


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
                                    HttpSession session,
                                    @RequestParam(defaultValue = "전체") String boardType) throws Exception {
//        System.out.println("page = " + page);
        return service.list(page, pageAmount, offsetReset, session, boardType);
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
    public ResponseEntity edit(Board board,
                               @RequestParam(value = "removeFileList[]", required = false)
                               List<String> removeFileList,
                               @RequestParam(value = "addFileList[]", required = false)
                               MultipartFile[] addFileList
    ) throws Exception {
        System.out.println("이것은 PUT요청 board= " + board);

        if (service.validate(board)) {
            service.edit(board, removeFileList, addFileList);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("like")
    @PreAuthorize("isAuthenticated()")
    public Map<String, Object> like(@RequestBody Map<String, Object> req,
                                    Authentication authentication) {
        System.out.println("컨트롤러의 like메서드 req = " + req);
        return service.like(req, authentication);
    }
}

