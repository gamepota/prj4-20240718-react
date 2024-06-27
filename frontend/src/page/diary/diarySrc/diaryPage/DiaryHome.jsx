import React, {useContext, useEffect, useState} from "react";
import {Outlet, useParams} from "react-router-dom";
import {Box, Center, Spinner, Text} from "@chakra-ui/react";
import { DiaryNavbar } from "../diaryComponent/DiaryNavbar.jsx";
import { LoginContext } from "../../../../component/LoginProvider.jsx";
import axios from "axios";

export function DiaryHome() {
  const { memberInfo, setMemberInfo } = useContext(LoginContext);
  const { diaryId } = useParams();
  const [isValidDiaryId, setIsValidDiaryId] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [ownerNickname, setOwnerNickname] = useState("");

  useEffect(() => {
    const validateDiaryId = async () => {
      try {
        const response = await axios.get(`/api/member/validateDiaryId/${diaryId}`);
        console.log(diaryId)
        setIsValidDiaryId(response.data.isValid);
        console.log(response.data)
        if (response.data.isValid) {
          setOwnerNickname(response.data.nickname);
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
    <Box mb={30}>
      <Box>
        <Center fontSize="25px">{ownerNickname}님의 펫 다이어리</Center>
      </Box>
      <Box>
        <DiaryNavbar />
      </Box>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
}
