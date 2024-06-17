package com.backend.service.diary;

import com.backend.domain.diary.DiaryBoard;
import com.backend.mapper.diary.DiaryBoardMapper;
import com.backend.mapper.member.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;


@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class DiaryBoardService {
    private final DiaryBoardMapper mapper;
    private final MemberMapper memberMapper;

    @Value("${aws.s3.bucket.name}")
    String bucketName;

    public void add(DiaryBoard diaryBoard, MultipartFile[] files, Authentication authentication) {
        diaryBoard.setMemberId(Integer.valueOf(authentication.getName()));
        mapper.insert(diaryBoard);

    }


    public boolean validate(DiaryBoard diaryBoard) {
        if (diaryBoard.getContent() == null || diaryBoard.getContent().isBlank()) {
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

        return mapper.selectById(id);

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
