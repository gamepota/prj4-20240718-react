package com.backend.service.diary;

import com.backend.domain.diary.DiaryGallery;
import com.backend.mapper.diary.DiaryGalleryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class DiaryGalleryService {

    private final DiaryGalleryMapper mapper;

    public List<DiaryGallery> GalleryList() {
        return mapper.selectAllGallery();
    }

    public void upLoadGallery(DiaryGallery diaryAlbum, MultipartFile file) {

        mapper.upLoadGallery(diaryAlbum, file);
    }
}
