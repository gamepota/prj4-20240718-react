import React, { useState } from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./page/Home.jsx";
import { MainPage } from "./page/MainPage.jsx";
import { LoginProvider } from "./component/LoginProvider.jsx";
import KakaoMap from "./KakaoMap.jsx";
import { AIChat } from "./component/chat/AIChat.jsx";

// Member
import { MemberSignup } from "./page/member/MemberSignup.jsx";
import { MemberLogin } from "./page/member/MemberLogin.jsx";
import { MemberFind } from "./page/member/MemberFind.jsx";
import { MemberPage } from "./page/member/MemberPage.jsx";
import { MemberList } from "./page/member/MemberList.jsx";
import { MemberEdit } from "./page/member/MemberEdit.jsx";

// Board
import { BoardWrite } from "./page/board/BoardWrite.jsx";
import { BoardList } from "./page/board/BoardList.jsx";
import { BoardView } from "./page/board/BoardView.jsx";
import { BoardEdit } from "./page/board/BoardEdit.jsx";
import { BoardReportList } from "./page/board/BoardReportList.jsx";
import { BoardReportListContents } from "./page/board/BoardReportListContents.jsx";

// Diary
import { DiaryHome } from "./page/diary/diarySrc/diaryPage/DiaryHome.jsx";
import { DiaryHomeMain } from "./page/diary/diarySrc/diaryPage/DiaryHomeMain.jsx";
import { DiaryBoardWrite } from "./page/diary/diarySrc/diaryPage/diaryBoard/DiaryBoardWrite.jsx";
import { DiaryBoardList } from "./page/diary/diarySrc/diaryPage/diaryBoard/DiaryBoardList.jsx";
import { DiaryBoardView } from "./page/diary/diarySrc/diaryPage/diaryBoard/DiaryBoardView.jsx";
import { DiaryBoardEdit } from "./page/diary/diarySrc/diaryPage/diaryBoard/DiaryBoardEdit.jsx";
import { DiaryComment } from "./page/diary/diarySrc/diaryPage/diaryComment/DiaryComment.jsx";
import { DiaryCommentWrite } from "./page/diary/diarySrc/diaryPage/diaryComment/DiaryCommentWrite.jsx";
import { DiaryCommentView } from "./page/diary/diarySrc/diaryPage/diaryComment/DiaryCommentView.jsx";
import DiaryCalendar from "./page/diary/diarySrc/diaryPage/diaryCalendar/DiaryCalendar.jsx";

// Place
import { PlaceLocal } from "./page/place/PlaceLocal.jsx";
import { PlaceMap } from "./page/place/PlaceMap.jsx";
import { PlaceMap2 } from "./page/place/PlaceMap2.jsx";
import { PlaceReview } from "./page/place/PlaceReview.jsx";

const App = () => {
  const [selectedCtprvnCd, setSelectedCtprvnCd] = useState(null);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        { index: true, element: <MainPage /> }, // 메인페이지 렌더링
        {
          path: "kakao-map",
          element: <KakaoMap onPolygonSelect={setSelectedCtprvnCd} />,
        }, // KakaoMap 경로 설정
        { path: "aichat", element: <AIChat /> }, // 챗봇 기능

        // Member
        { path: "member/signup", element: <MemberSignup /> }, // 회원 가입
        { path: "member/login", element: <MemberLogin /> }, // 로그인
        { path: "member/find", element: <MemberFind /> }, // 비밀번호 찾기
        { path: "member/page/:id", element: <MemberPage /> }, // 회원 페이지
        { path: "member/list", element: <MemberList /> }, // 회원 목록
        { path: "member/edit/:id", element: <MemberEdit /> }, // 회원 정보 수정 및 탈퇴

        // Board
        { path: "board/write", element: <BoardWrite /> }, // 게시판 글쓰기
        { path: "board/list", element: <BoardList /> }, // 게시판 목록
        { path: "board/:id", element: <BoardView /> }, // 게시글 보기
        { path: "board/edit/:id", element: <BoardEdit /> }, // 게시글 수정
        { path: "board/list/report", element: <BoardReportList /> }, // 신고 목록
        {
          path: "board/list/report/content",
          element: <BoardReportListContents />,
        }, // 신고 내용

        // Diary
        {
          path: "diary/:diaryId",
          element: <DiaryHome />,
          children: [
            // 다이어리 하위 경로 설정
            { index: true, element: <DiaryHomeMain /> }, // 다이어리 메인페이지 렌더링
            { path: "write/", element: <DiaryBoardWrite /> }, // 다이어리 쓰기
            { path: "list/", element: <DiaryBoardList /> }, // 다이어리 목록
            { path: "view/:id", element: <DiaryBoardView /> }, // 다이어리 보기
            { path: "edit/:id", element: <DiaryBoardEdit /> }, // 다이어리 수정
            { path: "comment/:id", element: <DiaryComment /> }, // 방명록
            { path: "comment/write/:id", element: <DiaryCommentWrite /> }, // 방명록 쓰기
            { path: "comment/view/:id", element: <DiaryCommentView /> }, // 방명록 보기
            { path: "calendar", element: <DiaryCalendar /> }, // 예방접종
          ],
        },

        // Place
        { path: "place/local", element: <PlaceLocal /> }, // 로컬 보기
        { path: "place/map", element: <PlaceMap /> }, // 지도 보기
        {
          path: "place-map2",
          element: <PlaceMap2 ctprvnCd={selectedCtprvnCd} />,
        }, // 지도 보기 경로 설정
        { path: "place/:id", element: <PlaceReview /> }, // 병원 정보 보기
      ],
    },
  ]);

  return (
    <LoginProvider>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </LoginProvider>
  );
};

export default App;
