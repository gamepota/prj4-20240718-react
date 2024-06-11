import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MemberSignup } from "./page/member/MemberSignup.jsx";
import { MemberLogin } from "./page/member/MemberLogin.jsx";
import { Home } from "./page/Home.jsx";
import { BoardWrite } from "./page/board/BoardWrite.jsx";
import { BoardList } from "./page/board/BoardList.jsx";
import { BoardView } from "./page/board/BoardView.jsx";
import { DiaryHome } from "./page/diary/diarySrc/diaryPage/DiaryHome.jsx";
import { DiaryBoardWrite } from "./page/diary/diarySrc/diaryPage/diaryBoard/DiaryBoardWrite.jsx";
import { DiaryBoardList } from "./page/diary/diarySrc/diaryPage/diaryBoard/DiaryBoardList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "diary/list", element: <DiaryBoardList /> }, //
      { path: "diary/write", element: <DiaryBoardWrite /> }, // 방명록 쓰기
      { path: "diary/home", element: <DiaryHome /> }, // 다이어리 홈
      { path: "member/signup", element: <MemberSignup /> }, // 회원 가입
      { path: "member/login", element: <MemberLogin /> }, // 회원 로그인
      { path: "write", element: <BoardWrite /> }, //게시판 글쓰기
      { path: "board", element: <BoardList /> }, //게시판 목록
      { path: "board/:id", element: <BoardView /> }, //게시글 보기
    ],
  },
]);

function App(props) {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
