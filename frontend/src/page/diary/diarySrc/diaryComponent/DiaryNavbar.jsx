import React, { useContext, useEffect, useState } from "react";
import { Button, VStack } from "@chakra-ui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../../../component/LoginProvider.jsx";
import axios from "axios";
import {
  extractUserIdFromDiaryId,
  generateDiaryId,
} from "../../../../util/util";

export function DiaryNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { memberInfo } = useContext(LoginContext);
  const { diaryId } = useParams();
  const friendId = extractUserIdFromDiaryId(diaryId);
  const [isFriend, setIsFriend] = useState(false);
  const [isOwnDiary, setIsOwnDiary] = useState(false);
  const [activeButton, setActiveButton] = useState(location.pathname); // 현재 경로로 초기화

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

  const handleButtonClick = (path) => {
    setActiveButton(path);
    navigate(path);
  };

  return (
    <VStack
      spacing={1} // 버튼들이 약간의 간격을 두고 배치되도록 설정
      bg="purple.100"
      p={2}
      borderRadius="md"
      w="100%"
    >
      <Button
        onClick={() => handleButtonClick(`/diary/${diaryId}`)}
        cursor={"pointer"}
        w="100%"
        bg={activeButton === `/diary/${diaryId}` ? "blue.400" : "blue.200"}
        _hover={{
          bgColor: "blue.200",
        }}
        boxShadow="md"
      >
        홈
      </Button>
      <Button
        onClick={() => handleButtonClick(`/diary/${diaryId}/comment`)}
        cursor={"pointer"}
        w="100%"
        bg={
          activeButton === `/diary/${diaryId}/comment` ? "blue.400" : "blue.200"
        }
        _hover={{
          bg: "blue.200",
        }}
        boxShadow="md"
      >
        방명록
      </Button>
      <Button
        onClick={() => handleButtonClick(`/diary/${diaryId}/list`)}
        cursor={"pointer"}
        w="100%"
        bg={activeButton === `/diary/${diaryId}/list` ? "blue.400" : "blue.200"}
        _hover={{
          bgColor: "blue.200",
        }}
        boxShadow="md"
      >
        일기장
      </Button>
      {isOwnDiary && (
        <Button
          onClick={() => handleButtonClick(`/diary/${diaryId}/calendar`)}
          cursor={"pointer"}
          w="100%"
          bg={
            activeButton === `/diary/${diaryId}/calendar`
              ? "blue.400"
              : "blue.200"
          }
          _hover={{
            bg: "blue.200",
          }}
          boxShadow="md"
        >
          기록
        </Button>
      )}
      {!isFriend && !isOwnDiary && (
        <Button size="sm" onClick={addFriend} w="100%">
          친구 추가
        </Button>
      )}
      {!isOwnDiary && (
        <Button
          onClick={() =>
            handleButtonClick(`/diary/${generateDiaryId(memberInfo.id)}`)
          }
          w="100%"
          bg={
            activeButton === `/diary/${generateDiaryId(memberInfo.id)}`
              ? "blue.400"
              : "blue.200"
          }
          _hover={{
            bg: "blue.200",
          }}
          boxShadow="md"
        >
          MyHome
        </Button>
      )}
    </VStack>
  );
}
