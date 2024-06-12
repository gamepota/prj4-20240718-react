package com.backend.mapper.diary;

import com.backend.domain.diary.DiaryAlbum;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface DiaryGalleryMapper {

    @Select("""
                SELECT *
                FROM Gallery
                ORDER BY inserted DESC
            """)
    List<DiaryAlbum> selectAllAlbum();

}
