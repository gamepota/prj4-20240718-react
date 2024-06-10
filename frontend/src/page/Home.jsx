import React from "react";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import {ChatComponent} from "./ChatComponent.jsx";

export function Home() {
  return (
    <Box>
      <ChatComponent/>
      <Outlet />
    </Box>
  );
}
