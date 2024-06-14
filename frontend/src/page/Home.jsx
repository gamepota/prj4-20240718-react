import React from "react";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { FriendsListComponent } from "../component/chat/FriendsListComponent.jsx";
import { ChatComponent } from "../component/chat/ChatComponent.jsx";

export const Home = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
  };

  const handleCloseChat = () => {
    setSelectedFriend(null);
  };

  return (
    <Box>
      <Box>
      <Outlet />
      </Box>
      <FriendsListComponent onSelectFriend={handleSelectFriend} />
      {selectedFriend && <ChatComponent selectedFriend={selectedFriend} onClose={handleCloseChat} />}
    </Box>
  );
};
