import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../../../component/LoginProvider.jsx";
import axios from "axios";
import {
  extractUserIdFromDiaryId,
  generateDiaryId,
} from "../../../../util/util";

export function DiaryNavbar() {
  const navigate = useNavigate();
  const { memberInfo } = useContext(LoginContext);
  const { diaryId } = useParams();
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
    <Flex
      alignContent={"space-between"}
      justifyContent="space-between"
      alignItems="center"
      h="50px"
      w="100%"
    >
      <Flex gap={5}>
        <Box>
          <Button
            onClick={() => navigate(`/diary/${diaryId}`)}
            cursor={"pointer"}
            _hover={{
              bgColor: "blue.200",
            }}
          >
            홈
          </Button>
        </Box>
        <Box>
          <Button
            onClick={() => navigate(`/diary/${diaryId}/comment`)}
            cursor={"pointer"}
            _hover={{
              bg: "blue.200",
            }}
          >
            방명록
          </Button>
        </Box>
        <Box>
          <Button
            onClick={() => navigate(`/diary/${diaryId}/list`)}
            cursor={"pointer"}
            _hover={{
              bgColor: "blue.200",
            }}
          >
            내 다이어리
          </Button>
        </Box>
        {isOwnDiary && (
          <Box>
            <Button
              onClick={() => navigate(`/diary/${diaryId}/calendar`)}
              cursor={"pointer"}
              _hover={{
                bg: "blue.200",
              }}
            >
              기록
            </Button>
          </Box>
        )}

        {!isFriend && !isOwnDiary && (
          <Box>
            <Button size="sm" onClick={addFriend}>
              친구 추가
            </Button>
          </Box>
        )}
      </Flex>
      <Box>
        {!isOwnDiary && (
          <Button
            onClick={() => navigate(`/diary/${generateDiaryId(memberInfo.id)}`)}
          >
            내 미니홈피 가기
          </Button>
        )}
      </Box>
    </Flex>
  );
}
