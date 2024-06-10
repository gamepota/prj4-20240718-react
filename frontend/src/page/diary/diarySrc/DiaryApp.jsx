import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DiaryHome from "./diaryPage/DiaryHome.jsx";
import { DiaryBoardWrite } from "./diaryPage/diaryBoard/DiaryBoardWrite.jsx";
import { DiaryBoardList } from "./diaryPage/diaryBoard/DiaryBoardList.jsx";
import { DiaryBoardView } from "./diaryPage/diaryBoard/DiaryBoardView.jsx";
import { DiaryBoardEdit } from "./diaryPage/diaryBoard/DiaryBoardEdit.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DiaryHome />,
    children: [
      {
        index: true,
        element: <DiaryBoardList />,
      },
      { path: "write", element: <DiaryBoardWrite /> },
      { path: "board/:id", element: <DiaryBoardView /> },
      { path: "edit/:id", element: <DiaryBoardEdit /> },
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
