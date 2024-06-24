import React, { useState, useContext } from "react";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { FriendsListComponent } from "../component/chat/FriendsListComponent.jsx";
import { ChatComponent } from "../component/chat/ChatComponent.jsx";
import { Navbar } from "../component/Navbar.jsx";
import { LoginContext } from "../component/LoginProvider.jsx"; // 경로에 맞게 수정

export const Home = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const { isLoggedIn } = useContext(LoginContext); // isLoggedIn 가져오기

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
  };

  const handleCloseChat = () => {
    setSelectedFriend(null);
  };

  return (
    <Box>
      <Navbar />
      <Box>
        <Outlet />
      </Box>
      {localStorage.getItem("access") && (
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
  );
};
