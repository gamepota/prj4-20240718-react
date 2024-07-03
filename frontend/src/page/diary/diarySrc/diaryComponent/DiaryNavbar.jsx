import React, {useContext, useEffect, useState} from "react";
import {Box, Button, VStack} from "@chakra-ui/react";
import {useNavigate, useParams} from "react-router-dom";
import {LoginContext} from "../../../../component/LoginProvider.jsx";
import axios from "axios";
import {extractUserIdFromDiaryId, generateDiaryId} from "../../../../util/util";

export function DiaryNavbar() {
  const navigate = useNavigate();
  const {memberInfo} = useContext(LoginContext);
  const {diaryId} = useParams();
  const friendId = extractUserIdFromDiaryId(diaryId);
  const [isFriend, setIsFriend] = useState(false);
  const [isOwnDiary, setIsOwnDiary] = useState(false);

  useEffect(() => {
    if (memberInfo && Number(memberInfo.id) === friendId) {
      setIsOwnDiary(true);
    } else {
      checkFriendship();
    }
  }, [memberInfo, friendId]);

  const checkFriendship = async () => {
    if (memberInfo && friendId && memberInfo.id !== friendId) {
      try {
        const response = await axios.get("/api/friends/check", {
          params: {
            memberId: memberInfo.id,
            friendId: friendId,
          },
        });
        setIsFriend(response.data);
      } catch (error) {
        console.error("Error checking friendship:", error);
      }
    }
  };

  const addFriend = async () => {
    if (memberInfo && memberInfo.id !== friendId && !isFriend) {
      try {
        const response = await axios.post("/api/friends/add", {
          memberId: memberInfo.id,
          friendId: friendId,
        });
        setIsFriend(true);
        console.log("Friend added successfully:", response.data);
      } catch (error) {
        console.error("Error adding friend:", error);
      }
    }
  };

  return (
    <VStack
      spacing={4}
      bg="white"
      p={2}
      border="1px solid #ccc"
      borderRadius="md"
      w="100%"
    >
      <Button
        onClick={() => navigate(`/diary/${diaryId}`)}
        cursor={"pointer"}
        w="100%"
        _hover={{
          bgColor: "blue.200",
        }}
      >
        홈
      </Button>
      <Button
        onClick={() => navigate(`/diary/${diaryId}/comment`)}
        cursor={"pointer"}
        w="100%"
        _hover={{
          bg: "blue.200",
        }}
      >
        방명록
      </Button>
      <Button
        onClick={() => navigate(`/diary/${diaryId}/list`)}
        cursor={"pointer"}
        w="100%"
        _hover={{
          bgColor: "blue.200",
        }}
      >
        일기장
      </Button>
      <Button
        onClick={() => navigate(`/diary/${diaryId}/calendar`)}
        cursor={"pointer"}
        w="100%"
        _hover={{
          bg: "blue.200",
        }}
      >
        기록
      </Button>
      {!isFriend && !isOwnDiary && (
        <Button size="sm" onClick={addFriend} w="100%">
          친구 추가
        </Button>
      )}
      {!isOwnDiary && (
        <Button onClick={() => navigate(`/diary/${generateDiaryId(memberInfo.id)}`)} w="100%">
          내 미니홈피 가기
        </Button>
      )}
    </VStack>
  );
}