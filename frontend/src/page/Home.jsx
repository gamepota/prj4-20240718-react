import {Box} from "@chakra-ui/react";
import {Outlet} from "react-router-dom";
import {Navbar} from "./Navbar.jsx";
import {ChatComponent} from "./ChatComponent.jsx";

export function Home() {
  return (
    <Box>
      <Navbar/>
      <Outlet/>
      <ChatComponent/>
    </Box>
  );
}
