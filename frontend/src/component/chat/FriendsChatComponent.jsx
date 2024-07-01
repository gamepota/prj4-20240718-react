import React, { useState } from "react";
import { FriendsListComponent } from "./FriendsListComponent";
import { ChatComponent } from "./ChatComponent";

export const FriendsChatComponent = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [newMessages, setNewMessages] = useState({});

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
    setNewMessages((prev) => ({ ...prev, [friend.id]: false }));
  };

  const handleNewMessage = (senderId) => {
    console.log("New message from:", senderId);
    setNewMessages((prev) => ({ ...prev, [senderId]: true }));
  };

  return (
    <div>
      <FriendsListComponent
        onSelectFriend={handleSelectFriend}
        newMessages={newMessages}
      />
      {selectedFriend && (
        <ChatComponent
          selectedFriend={selectedFriend}
          onClose={() => setSelectedFriend(null)}
          onNewMessage={handleNewMessage} // onNewMessage prop 추가
        />
      )}
    </div>
  );
};
