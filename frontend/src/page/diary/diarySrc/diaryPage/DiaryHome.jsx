import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Button, VStack } from "@chakra-ui/react";
import { DiaryNavbar } from "../diaryComponent/DiaryNavbar.jsx";
import axios from "axios";

export function DiaryHome() {
  const memberId = 1; // 하드코딩된 memberId
  const friendId = 2;
  const handleAddFriend = async () => {
    try {
      const response = await axios.post("/api/friends/add", null, {
        params: { memberId, friendId },
      });
      console.log("Friend added:", response.data);
    } catch (error) {
      console.error("There was an error adding the friend!", error);
    }
  };

  return (
    <Box mb={30}>
      <DiaryNavbar />
      <Box
        mx={{
          base: 0,
          lg: 200,
        }}
        mt={100}
      >
        <Box p={4}>
          <VStack spacing={4}>
            <Button onClick={handleAddFriend} colorScheme="teal">
              친구추가
            </Button>
          </VStack>
        </Box>
      </Box>
      <Outlet />
    </Box>
  );
}
