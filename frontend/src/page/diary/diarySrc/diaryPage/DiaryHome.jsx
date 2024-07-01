import React, { useContext, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { Box, Button, Center, Input, Spinner, Text, Textarea, VStack, Image, HStack } from "@chakra-ui/react";
import { DiaryNavbar } from "../diaryComponent/DiaryNavbar.jsx";
import { LoginContext } from "../../../../component/LoginProvider.jsx";
import axios from "axios";
import { FriendAddButton } from "../../../../component/FriendAddButton.jsx";
import {extractUserIdFromDiaryId} from "../../../../util/util.jsx";

export function DiaryHome() {
  const { memberInfo } = useContext(LoginContext);
  const { diaryId } = useParams();
  const [isValidDiaryId, setIsValidDiaryId] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [ownerNickname, setOwnerNickname] = useState("");
  const [ownerId, setOwnerId] = useState(null); // 다이어리 주인의 ID 상태 추가
  const [profileData, setProfileData] = useState({ statusMessage: "", introduction: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const validateDiaryId = async () => {
      try {
        const response = await axios.get(`/api/member/validateDiaryId/${diaryId}`);
        setIsValidDiaryId(response.data.isValid);
        if (response.data.isValid) {
          setOwnerNickname(response.data.nickname);
          setOwnerId(response.data.ownerId); // ownerId 설정 추가
        }
      } catch (error) {
        console.error("Error validating diary ID:", error);
        setIsValidDiaryId(false);
      } finally {
        setIsLoading(false);
      }
    };
    validateDiaryId();
  }, [diaryId]);

  // ownerId 변경 감지를 위한 useEffect 추가
  useEffect(() => {
    if (ownerId) {
      fetchDiaryProfile(ownerId); // ownerId를 사용하여 프로필 정보 가져오기
    }
  }, [ownerId]);

  const fetchDiaryProfile = async (ownerId) => {
    try {
      const response = await axios.get(`/api/diaryBoard/profile/${ownerId}`);
      const { status_message, introduction } = response.data;
      setProfileData({ statusMessage: status_message || "", introduction: introduction || "" });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // 프로필이 존재하지 않는 경우 기본값 설정
        setProfileData({ statusMessage: "", introduction: "" });
      } else {
        console.error("Error fetching diary profile:", error);
      }
    }
  };

  const handleSaveProfileData = async () => {
    const data = {
      ownerId: extractUserIdFromDiaryId(diaryId),
      status_message: profileData.statusMessage,
      introduction: profileData.introduction
    };

    try {
      // 프로필 존재 여부 확인
      const checkProfileResponse = await axios.get(`/api/diaryBoard/profile/${ownerId}`);
      if (checkProfileResponse.status === 200) {
        // 프로필이 존재하면 PUT 요청
        await axios.put(`/api/diaryBoard/profile/${ownerId}`, data);
      } else {
        // 프로필이 존재하지 않으면 POST 요청
        await axios.post(`/api/diaryBoard/profile`, data);
      }

      console.log("Profile data saved successfully.");
      setIsEditing(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // 프로필이 존재하지 않으면 POST 요청
        await axios.post(`/api/diaryBoard/profile`, data);
        console.log("Profile created successfully.");
        setIsEditing(false);
      } else {
        console.error("Error saving profile data:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <Center mt={10}>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!isValidDiaryId) {
    return (
      <Center mt={10}>
        <Text fontSize="xl" fontWeight="bold" color="red.500">
          잘못된 접근입니다.
        </Text>
      </Center>
    );
  }

  return (
    <Center bg="gray.100" minH="100vh">
      <Box
        w="1300px" // 박스 크기를 좌우로 더 늘림
        h="800px"
        p={6}
        bg="white"
        boxShadow="lg"
        borderRadius="md"
        position="relative"
        overflow="hidden"
      >
        <Box
          w="100%"
          h="100%"
          border="2px solid #ccc"
          borderRadius="md"
          display="flex"
          flexDirection="row"
        >
          <VStack
            w="30%"
            h="100%"
            bg="white"
            borderRight="2px solid #ccc"
            p={4}
            spacing={4}
            alignItems="center"
          >
            <Text fontSize="xl" fontWeight="bold">
              {ownerNickname}님의 미니홈피
            </Text>
            <Box>
              <Image
                borderRadius='full'
                boxSize='150px'
                src='https://bit.ly/dan-abramov'
                alt='Dan Abramov'
              />
            </Box>

            {isEditing ? (
              <>
                <Input
                  value={profileData.statusMessage}
                  onChange={(e) => setProfileData({ ...profileData, statusMessage: e.target.value })}
                  placeholder="상태메시지를 입력하세요"
                  size="sm"
                  h="30px"
                />
                <Textarea
                  value={profileData.introduction}
                  onChange={(e) => setProfileData({ ...profileData, introduction: e.target.value })}
                  placeholder="자기소개를 입력하세요"
                  size="sm"
                  height="250px"
                  bg="white"
                  maxLength={255}
                />
                <HStack spacing={2} alignSelf="flex-end"> // 버튼들을 입력창 우측 아래로 정렬
                  <Button colorScheme="teal" size="sm" onClick={handleSaveProfileData}>
                    저장
                  </Button>
                </HStack>
              </>
            ) : (
              <>
                <Text>{profileData.statusMessage}</Text>
                <Textarea value={profileData.introduction || "자기소개가 없습니다."} fontSize="sm" h={"250px"} readOnly/>
                <HStack spacing={2} alignSelf="flex-end"> // 버튼들을 입력창 우측 아래로 정렬
                  <Button colorScheme="teal" size="sm" onClick={() => setIsEditing(true)}>
                    수정
                  </Button>
                </HStack>
              </>
            )}
          </VStack>
          <VStack w="70%" h="100%" bg="white" p={4} spacing={4}>
            <DiaryNavbar />
            <Box
              w="100%"
              h="100%"
              border="1px solid #ccc"
              borderRadius="md"
              overflowY="auto"
              bg="white"
            >
              <Outlet />
            </Box>
          </VStack>
        </Box>
        {ownerId && memberInfo && Number(memberInfo.id) !== ownerId && (
          <Box position="absolute" bottom="10px" right="10px">
            <FriendAddButton friendId={ownerId} />
          </Box>
        )}
      </Box>
    </Center>
  );
}
