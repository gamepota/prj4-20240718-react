package com.backend.service.diary;

import com.backend.domain.diary.DiaryBoard;
import com.backend.domain.diary.DiaryBoardFile;
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

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
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

    public void add(DiaryBoard diaryBoard, MultipartFile[] files, Authentication authentication) throws IOException {
        diaryBoard.setMemberId(Integer.valueOf(authentication.getName()));
        // 게시물 저장
        mapper.insert(diaryBoard);

        // db에 해당 게시물의 파일 목록 저장
        if (files != null) {
            for (MultipartFile file : files) {
                mapper.insertFileName(diaryBoard.getId(), file.getOriginalFilename());
                //실제 파일 저장
                // 부모 디렉토리만들기
                String dir = STR."User:/parjaewook/Temp/prj3/\{diaryBoard.getId()}";
                File dirFile = new File(dir);
                if (!dirFile.exists()) {
                    dirFile.mkdirs();
                }

                // 파일 경로

                String path = STR."/" + file.getOriginalFilename();
                File destination = new File(path);
                file.transferTo(destination);
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
        return true;
    }


    public Map<String, Object> list(Integer page, String searchType, String keyword) {
        Map pageInfo = new HashMap();
        Integer countAll = mapper.countAllWithSearch(searchType, keyword);

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
        return Map.of("pageInfo", pageInfo, "diaryBoardList", mapper.selectAllPaging(offset, searchType, keyword));

    }

    public void remove(Integer id) {
        List<String> fileNames = mapper.selectFileNameByDiaryId(id);

        String dir = STR."User:/parkjaewook/Temp/prj3/\{id}";
        for (String fileName : fileNames) {
            File file = new File(dir + fileName);
            file.delete();
        }

        File dirFile = new File(dir);
        if (dirFile.exists()) {
            dirFile.delete();
        }

        //diaryBoardFile
        mapper.deleteFileByDiaryId(id);

        // diaryBoard
        mapper.deleteById(id);
    }

    public void edit(DiaryBoard diaryBoard, List<String> removeFileList) {
        if (removeFileList != null && removeFileList.size() > 0) {
            for (String fileName : removeFileList) {
                // disk의 파일 삭제
                String path = STR."User:/parkjaewook/Temp/prj3/\{diaryBoard}/\{fileName}";
                File file = new File(path);
                file.delete();
                // db records 삭제
                mapper.deleteFileByDiaryIdAndName(diaryBoard.getId(), fileName);
            }
        }
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

        DiaryBoard diaryBoard = mapper.selectById(id);
        List<String> fileNames = mapper.selectFileNameByDiaryId(id);
        List<DiaryBoardFile> files = fileNames.stream()
                .map(name -> new DiaryBoardFile(name, STR."http://localhost:5173/\{id}/\{name}"))
                .toList();

        diaryBoard.setFileList(files);

        return diaryBoard;
    }
}
