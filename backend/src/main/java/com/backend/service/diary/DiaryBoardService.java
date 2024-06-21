package com.backend.service.diary;

import com.backend.domain.diary.DiaryBoard;
import com.backend.domain.member.Member;
import com.backend.mapper.diary.DiaryBoardMapper;
import com.backend.mapper.member.MemberMapper;
import com.backend.security.CustomUserDetails;
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

    @Value("${image.src.prefix}")
    String srcPrefix;

    public void add(DiaryBoard diaryBoard, MultipartFile[] files, Authentication authentication) {

        Object principal = authentication.getPrincipal();
        if (principal instanceof CustomUserDetails username) {
            Member member = username.getMember();
            diaryBoard.setMemberId(member.getId());
            mapper.insert(diaryBoard);
        }

    }


    public boolean validate(DiaryBoard diaryBoard) {
        if (diaryBoard.getContent() == null || diaryBoard.getContent().isBlank()) {
            return false;
        }
        if (diaryBoard.getTitle() == null || diaryBoard.getTitle().isBlank()) {
            return false;
        }
        return true;
    }


    public Map<String, Object> list(Integer page, String searchType, String keyword) {
        Map pageInfo = new HashMap();
        Integer countAll = mapper.countAll();

        Integer offset = (page - 1) * 10;
        Integer lastPageNUmber = (countAll - 1) / 10 + 1;
        Integer leftPageNumber = (page - 1) * 10 * 10 + 1;
        Integer rightPageNumber = leftPageNumber + 9;
        rightPageNumber = Math.min(rightPageNumber, lastPageNUmber);
        leftPageNumber = rightPageNumber - 9;
        leftPageNumber = Math.max(leftPageNumber, 1);
        Integer prevPageNumber = leftPageNumber - 1;
        Integer nextPageNumber = rightPageNumber + 1;

        if (prevPageNumber > 0) {
            pageInfo.put("prevPageNumber", prevPageNumber);
        }
        if (nextPageNumber <= lastPageNUmber) {
            pageInfo.put("nextPageNumber", nextPageNumber);
        }

        pageInfo.put("currentPage", page);
        pageInfo.put("lastPageNumber", lastPageNUmber);
        pageInfo.put("leftPageNumber", leftPageNumber);
        pageInfo.put("rightPageNumber", rightPageNumber);
        return Map.of("pageInfo", pageInfo, "boardList", mapper.selectAllPaging(offset, searchType, keyword));

    }

    public void remove(Integer id) {
        mapper.deleteById(id);
    }

    public void edit(DiaryBoard diaryBoard) {

        mapper.update(diaryBoard);
    }

    public boolean hasAccess(Integer id, Authentication authentication) {
        if (authentication == null) {
            return false;
        }
        DiaryBoard diaryBoard = mapper.selectById(id);
        Object principal = authentication.getPrincipal();
        if (principal instanceof CustomUserDetails username) {
            Member member = username.getMember();

            return diaryBoard.getMemberId().equals(member.getId());
        }
        return diaryBoard.getMemberId().equals(Integer.valueOf(authentication.getName()));
    }

    public DiaryBoard get(Integer id) {
        return mapper.selectById(id);
    }
}
