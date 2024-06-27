import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../../../component/LoginProvider.jsx";
import axios from "axios";

export function DiaryNavbar() {
  const navigate = useNavigate();
  const { memberInfo } = useContext(LoginContext);
  const { diaryId } = useParams();
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    const checkFriendship = async () => {
      if (memberInfo && diaryId) {
        try {
          const response = await axios.get("/api/friends/check", {
            params: {
              memberNickname: memberInfo.nickname,
              friendNickname: diaryId.split('-')[1]
            }
          });
          setIsFriend(response.data);
        } catch (error) {
          console.error("Error checking friendship:", error);
        }
      }
    };

    checkFriendship();
  }, [memberInfo, diaryId]);

  const addFriend = async () => {
    if (memberInfo) {
      const friendNickname = diaryId.split('-')[1];
      const data = {
        memberNickname: memberInfo.nickname,
        friendNickname
      };

      try {
        const response = await axios.post('/api/friends/add', data);
        console.log('Friend added successfully:', response.data);
        setIsFriend(true);
      } catch (error) {
        console.error('Error adding friend:', error);
      }
    }
  };

  return (
    <Flex boxSize={"100%"} h={"50px"} alignContent={"space-between"} gap={5}>
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
          onClick={() => navigate(`/diary/${diaryId}/comment/list`)}
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
      <Box>
        <Button
          onClick={() => navigate(`/diary/${diaryId}/schedule`)}
          cursor={"pointer"}
          _hover={{
            bg: "blue.200",
          }}
        >
          접종 날짜
        </Button>
      </Box>
      <Box>
        {!isFriend && (
          <Button size="sm" onClick={addFriend}>
            친구 추가
          </Button>
        )}
      </Box>
    </Flex>
  );
}
