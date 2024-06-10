import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DiaryHome } from "./diaryPage/DiaryHome.jsx";
import { DiaryBoardWrite } from "./diaryPage/diaryBoard/DiaryBoardWrite.jsx";
import { DiaryBoardView } from "./diaryPage/diaryBoard/DiaryBoardView.jsx";
import { DiaryBoardEdit } from "./diaryPage/diaryBoard/DiaryBoardEdit.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DiaryHome />,
    children: [
      { path: "diary/writer", element: <DiaryBoardWrite /> }, // 방명록 쓰기
      { path: "diary/board/:id", element: <DiaryBoardView /> },
      { path: "diary/edit/:id", element: <DiaryBoardEdit /> },
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
