package com.backend.service.diary;

import com.backend.domain.diary.DiaryBoard;
import com.backend.mapper.diary.DiaryBoardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class DiaryBoardService {
    private final DiaryBoardMapper mapper;

    public void add(DiaryBoard diaryBoard, MultipartFile[] files) {


        mapper.insert(diaryBoard);
        if (files != null) {
            for (MultipartFile file : files) {
                mapper.insertFileName(diaryBoard.getId(), file.getOriginalFilename());
            }
        }

    }


    public boolean validate(DiaryBoard diaryBoard) {
        if (diaryBoard.getContent() == null || diaryBoard.getContent().isBlank()) {
            return false;
        }
        if (diaryBoard.getTitle() == null || diaryBoard.getTitle().isBlank()) {
            return false;
        }
        if (diaryBoard.getWriter() == null || diaryBoard.getWriter().isBlank()) {
            return false;
        }
        return true;
    }


    public Map<String, Object> list(Integer page, String searchType, String keyword) {
        Map pageInfo = new HashMap();
        Integer countAll = mapper.countAllWithSearch(searchType, keyword);

        Integer offset = (page - 1) * 10;
        Integer lastPageNumber = (countAll - 1) / 10 + 1;
        Integer leftPageNumber = (page - 1) / 10 * 10 + 1;
        Integer rightPageNumber = leftPageNumber + 9;
        rightPageNumber = Math.min(rightPageNumber, lastPageNumber);
        leftPageNumber = rightPageNumber - 9;
        leftPageNumber = Math.max(leftPageNumber, 1);
        Integer prevPageNumber = leftPageNumber - 1;
        Integer nextPageNumber = rightPageNumber + 1;

        if (prevPageNumber > 0) {
            pageInfo.put("prevPageNumber", prevPageNumber);
        }
        if (nextPageNumber <= lastPageNumber) {
            pageInfo.put("nextPageNumber", nextPageNumber);
        }
        pageInfo.put("currentPageNumber", page);
        pageInfo.put("lastPageNumber", lastPageNumber);
        pageInfo.put("leftPageNumber", leftPageNumber);
        pageInfo.put("rightPageNumber", rightPageNumber);

        return Map.of("pageInfo", pageInfo, "boardList", mapper.selectAllPaging(offset, searchType, keyword));
    }

    public DiaryBoard get(Integer id) {
        DiaryBoard diaryBoard = mapper.selectById(id);
        List<String> fileNames = mapper.selectFileNameByDiaryId(id);
        List<String> imageSrcList = fileNames.stream()
                .map(name -> STR."http://localhost:5173/\{id}/\{name}")
                .toList();
        diaryBoard.setImageSrcList(imageSrcList);

        return diaryBoard;

    }

    public void remove(Integer id) {
        mapper.deleteById(id);
    }

    public void edit(DiaryBoard diaryBoard) {

        mapper.update(diaryBoard);
    }

    public boolean hasAccess(Integer id, Authentication authentication) {
        DiaryBoard diaryBoard = mapper.selectById(id);
        return diaryBoard.getMemberId().equals(Integer.valueOf(authentication.getName()));
    }
}
