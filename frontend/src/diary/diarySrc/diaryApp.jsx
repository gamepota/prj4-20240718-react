import React from "react";
import { RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

function DiaryApp(props) {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default DiaryApp;
