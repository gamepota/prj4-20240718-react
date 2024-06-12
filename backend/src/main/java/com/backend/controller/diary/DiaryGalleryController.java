package com.backend.controller.diary;

import com.backend.domain.diary.DiaryGallery;
import com.backend.service.diary.DiaryGalleryService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/gallery")
public class DiaryGalleryController {

    private DiaryGalleryService service;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public void upLoadGallery(DiaryGallery diaryAlbum,
                              Authentication authentication,
                              @RequestParam(value = "files[]", required = false) MultipartFile file) {
        service.upLoadGallery(diaryAlbum, file);
    }

    @GetMapping("AlbumList")
    public List<DiaryGallery> AlbumList() {
        return service.GalleryList();
    }
}
