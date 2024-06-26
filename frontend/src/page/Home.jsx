import React, {useContext, useState} from "react";
import {Box} from "@chakra-ui/react";
import {Outlet} from "react-router-dom";
import {FriendsListComponent} from "../component/chat/FriendsListComponent.jsx";
import {ChatComponent} from "../component/chat/ChatComponent.jsx";
import {Navbar} from "../component/Navbar.jsx";
import { LoginContext } from "../component/LoginProvider.jsx";

export const Home = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const { memberInfo } = useContext(LoginContext) || {};

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
      <Box>
        {memberInfo && (
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
