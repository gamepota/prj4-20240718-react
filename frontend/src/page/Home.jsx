import React, { useContext, useState } from "react";
import { Box } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import { FriendsListComponent } from "../component/chat/FriendsListComponent.jsx";
import { ChatComponent } from "../component/chat/ChatComponent.jsx";
import { Navbar } from "../component/Navbar.jsx";
import { LoginContext } from "../component/LoginProvider.jsx";

export const Home = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const { memberInfo } = useContext(LoginContext) || {};
  const location = useLocation();
  const hideNavbarRoutes = ["/diary"];

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
  };

  const handleCloseChat = () => {
    setSelectedFriend(null);
  };

  const shouldHideNavbar = hideNavbarRoutes.some(route => location.pathname.startsWith(route));

  return (
    <Box>
      {!shouldHideNavbar && <Navbar />}
      <Box>
        <Outlet />
      </Box>
      <Box>
        {!shouldHideNavbar && memberInfo && (
          <>
            <FriendsListComponent onSelectFriend={handleSelectFriend} />
            {selectedFriend && (
              <ChatComponent
                selectedFriend={selectedFriend}
                onClose={handleCloseChat}
              />
            )}
          </>
        )}
      </Box>
    </Box>
  );
};
