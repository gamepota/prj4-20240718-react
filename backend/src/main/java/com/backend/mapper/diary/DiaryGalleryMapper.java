package com.backend.mapper.diary;

import com.backend.domain.diary.DiaryGallery;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Mapper
public interface DiaryGalleryMapper {

    @Select("""
                SELECT *
                FROM gallery
                ORDER BY inserted DESC
            """)
    List<DiaryGallery> selectAllGallery();


    @Insert("""
            INSERT INTO gallery(writer,title,data)
            VALUES (#{writer},#{title},#{data})
            """)
    int upLoadGallery(DiaryGallery diaryAlbum, MultipartFile file);
}
