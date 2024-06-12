package com.backend.controller.diary;

import com.backend.domain.diary.DiaryAlbum;
import com.backend.service.diary.DiaryGalleryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/gallery")
public class DiaryGalleryController {

    private DiaryGalleryService service;

    @GetMapping("AlbumList")
    public List<DiaryAlbum> AlbumList() {
        return service.AlbumList();
    }
}
