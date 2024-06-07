import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignupStepA } from "./page/member/SignupStepA.jsx";
import { SignupStepB } from "./page/member/SignupStepB.jsx";
import { SignupStepC } from "./page/member/SignupStepC.jsx";
import { Home } from "./page/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "signup/stepa", element: <SignupStepA /> },
      { path: "signup/stepb", element: <SignupStepB /> },
      { path: "signup/stepc", element: <SignupStepC /> },
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
