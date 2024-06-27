import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import axios from 'axios';
import { LoginContext } from './LoginProvider.jsx';

export const FriendAddButton = ({ friendId }) => {
  const { memberInfo } = useContext(LoginContext);
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    const checkFriendship = async () => {
      if (memberInfo && friendId) {
        try {
          const response = await axios.get('/api/friends/check', {
            params: { memberId: memberInfo.id, friendId }
          });
          setIsFriend(response.data);
        } catch (error) {
          console.error('Error checking friendship:', error);
        }
      }
    };

    checkFriendship();
  }, [memberInfo, friendId]);

  const addFriend = async () => {
    if (!memberInfo || !friendId) return;

    const data = {
      memberId: memberInfo.id,
      friendId
    };

    try {
      await axios.post('/api/friends/add', data);
      setIsFriend(true);
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  if (isFriend) {
    return null; // 친구인 경우 버튼 숨기기
  }

  return (
    <Button size="sm" onClick={addFriend}>
      친구 추가
    </Button>
  );
};
