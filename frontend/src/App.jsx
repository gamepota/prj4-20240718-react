import React from "react";
import {ChakraProvider} from "@chakra-ui/react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {MemberSignup} from "./page/member/MemberSignup.jsx";
import {MemberLogin} from "./page/member/MemberLogin.jsx";
import {Home} from "./page/Home.jsx";
import {BoardWrite} from "./page/board/BoardWrite.jsx";
import {BoardList} from "./page/board/BoardList.jsx";
import {BoardView} from "./page/board/BoardView.jsx";
import {AIChat} from "./component/chat/AIChat.jsx";
import {MainPage} from "./page/MainPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { index: true, element: <MainPage />},
      { path: "member/signup", element: <MemberSignup /> },
      { path: "member/login", element: <MemberLogin /> },
      { path: "write", element: <BoardWrite /> },
      { path: "board", element: <BoardList /> },
      { path: "board/:id", element: <BoardView /> },
      { path: "aichat", element: <AIChat /> },
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
