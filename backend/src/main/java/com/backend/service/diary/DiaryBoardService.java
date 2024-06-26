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
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class DiaryBoardService {
    private final DiaryBoardMapper mapper;
    private final S3Client s3Client;
    private final MemberMapper memberMapper;

    @Value("${aws.s3.bucket.name}")
    private String bucketName;

    @Value("${image.src.prefix}")
    private String srcPrefix;

    public void add(DiaryBoard diaryBoard, MultipartFile[] files, Authentication authentication) throws IOException {
        String username = diaryBoard.getUsername();
        Member member = memberMapper.selectByDiaryName(username);

        if (member != null) {
            // 회원 ID를 설정
            diaryBoard.setMemberId(member.getId());

            // 코멘트를 diary 테이블에 삽입
            mapper.insert(diaryBoard);
        } else {
            throw new UsernameNotFoundException("Username not found: " + username);
        }

        // db에 해당 게시물의 파일 목록 저장
        if (files != null) {
            for (MultipartFile file : files) {
                mapper.insertFileName(diaryBoard.getId(), file.getOriginalFilename());
                //실제 파일 저장
                // 부모 디렉토리만들기
                String fileName = STR."\{diaryBoard.getMemberId()}_\{file.getOriginalFilename()}";
                String key = STR."prj3/diary/\{diaryBoard.getMemberId()}/\{fileName}";
                PutObjectRequest objectRequest = PutObjectRequest.builder()
                        .bucket(bucketName)
                        .key(key)
                        .acl(ObjectCannedACL.PUBLIC_READ)
                        .build();

                s3Client.putObject(objectRequest,
                        RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

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
        Integer lastPageNumber = (countAll - 1) / 10 + 1;
        Integer leftPageNumber = (page - 1) * 10 * 10 + 1;
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

        pageInfo.put("currentPage", page);
        pageInfo.put("lastPageNumber", lastPageNumber);
        pageInfo.put("leftPageNumber", leftPageNumber);
        pageInfo.put("rightPageNumber", rightPageNumber);
        return Map.of("pageInfo", pageInfo, "diaryBoardList", mapper.selectAllPaging(offset, searchType, keyword));

    }

    public void remove(Integer id) {
        List<String> fileNames = mapper.selectFileNameByDiaryId(id);

        for (String fileName : fileNames) {
            String key = STR."prj3/diary/\{id}/\{fileName}";
            DeleteObjectRequest objectRequest = DeleteObjectRequest.builder().bucket(bucketName).key(key).build();
            s3Client.deleteObject(objectRequest);
        }

        //diaryBoardFile
        mapper.deleteFileByDiaryId(id);

        // diaryBoard
        mapper.deleteById(id);
    }

    public void edit(DiaryBoard diaryBoard, List<String> removeFileList, MultipartFile[] addFileList) throws IOException {
        if (removeFileList != null && removeFileList.size() > 0) {
            for (String fileName : removeFileList) {
                String key = STR."prj3/diary/\{diaryBoard.getMemberId()}/\{fileName}";
                DeleteObjectRequest objectRequest = DeleteObjectRequest.builder()
                        .bucket(bucketName)
                        .key(key)
                        .build();
                s3Client.deleteObject(objectRequest);

                // db records 삭제
                mapper.deleteFileByDiaryIdAndName(diaryBoard.getMemberId(), fileName);
            }
        }
        if (addFileList != null && addFileList.length > 0) {
            List<String> fileNameList = mapper.selectFileNameByDiaryId(diaryBoard.getId());
            for (MultipartFile file : addFileList) {
                String fileName = file.getOriginalFilename();

                if (!fileNameList.contains(fileName)) {

                    mapper.insertFileName(diaryBoard.getId(), fileName);
                }
                //disk 에 쓰기
                String key = STR."prj3/diary/\{diaryBoard.getMemberId()}/\{fileName}";
                PutObjectRequest objectRequest = PutObjectRequest.builder().bucket(bucketName).key(key).acl(ObjectCannedACL.PUBLIC_READ).build();

                s3Client.putObject(objectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
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
        String keyPrefix = String.format("prj3/%d/", id);
        ListObjectsV2Request listObjectsV2Request = ListObjectsV2Request.builder().bucket(bucketName)
                .prefix(keyPrefix).build();
        ListObjectsV2Response listResponse = s3Client.listObjectsV2(listObjectsV2Request);
        for (S3Object object : listResponse.contents()) {
            System.out.println("object.key() = " + object.key());
        }


        DiaryBoard diaryBoard = mapper.selectById(id);
        List<String> fileNames = mapper.selectFileNameByDiaryId(id);
        List<DiaryBoardFile> files = fileNames.stream()
                .map(name -> new DiaryBoardFile(name, srcPrefix + id + "/" + name)).collect(Collectors.toList());

        diaryBoard.setFileList(files);

        return diaryBoard;
    }
}
