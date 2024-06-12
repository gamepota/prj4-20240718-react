package com.backend.service.diary;

import com.backend.domain.diary.DiaryAlbum;
import com.backend.mapper.diary.DiaryGalleryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class DiaryGalleryService {

    private final DiaryGalleryMapper mapper;

    public List<DiaryAlbum> AlbumList() {
        return mapper.selectAllAlbum();
    }
}
