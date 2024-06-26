import React, { useContext } from 'react';
import { Button } from '@chakra-ui/react';
import axios from 'axios';
import {LoginContext} from "./LoginProvider.jsx";

export const FriendAddButton = ({ friendNickname }) => {
  const { memberInfo } = useContext(LoginContext);

  const addFriend = () => {
    if (!memberInfo || !friendNickname) return;

    const data = {
      memberNickname: memberInfo.nickname,
      friendNickname: friendNickname
    };

    axios.post('/api/friends/add', data)
      .then(response => {
        console.log('Friend added successfully:', response.data);
        // Optional: 추가 완료 후 UI 업데이트
      })
      .catch(error => {
        console.error('Error adding friend:', error);
      });
  };

  return (
    <Button size="sm" onClick={addFriend}>
      친구 추가
    </Button>
  );
};
