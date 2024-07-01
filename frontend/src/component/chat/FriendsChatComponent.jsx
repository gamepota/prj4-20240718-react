import {ChatComponent} from "./ChatComponent.jsx";
import {FriendsListComponent} from "./FriendsListComponent.jsx";
import {useCallback, useEffect, useState} from "react";

export const FriendsChatComponent = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [newMessages, setNewMessages] = useState({});

  const handleSelectFriend = useCallback((friend) => {
    setSelectedFriend(friend);
    setNewMessages((prev) => ({ ...prev, [friend.id]: false }));
  }, []);

  const handleNewMessage = useCallback((senderId) => {
    setNewMessages((prev) => ({ ...prev, [senderId]: true }));
  }, []);

  const handleCloseChat = useCallback(() => {
    setSelectedFriend(null);
  }, []);

  useEffect(() => {
    console.log("FriendsChatComponent rendered. selectedFriend:", selectedFriend);
    console.log("handleNewMessage:", handleNewMessage);
  }, [selectedFriend, handleNewMessage]);

  return (
    <div>
      <FriendsListComponent
        onSelectFriend={handleSelectFriend}
        newMessages={newMessages}
      />
      {selectedFriend && (
        <ChatComponent
          key={selectedFriend.id}
          selectedFriend={selectedFriend}
          onClose={handleCloseChat}
          onNewMessage={handleNewMessage}
        />
      )}
    </div>
  );
};
