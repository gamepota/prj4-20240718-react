import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DiaryHome from "./diaryPage/DiaryHome.jsx";
import { DiaryBoardWrite } from "./diaryPage/diaryBoard/DiaryBoardWrite.jsx";
import { DiaryBoardList } from "./diaryPage/diaryBoard/DiaryBoardList.jsx";

function DiaryBoardView() {
  return null;
}

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
