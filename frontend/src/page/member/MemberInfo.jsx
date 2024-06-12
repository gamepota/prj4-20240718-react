import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { MemberEdit } from "./MemberEdit";

export function MemberInfo(props) {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [memberData, setMemberData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 하드코딩된 테스트 데이터
    const testData = {
      email: "test@example.com",
      nickname: "testuser",
      name: "홍길동",
      birthDate: "19900101",
      phoneNumber: "010-1234-5678",
      address: "서울시 강남구 역삼동 123-45",
    };
    setMemberData(testData);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <Center>
        <Box>Loading...</Box>
      </Center>
    );
  }

  if (isEditing) {
    return <MemberEdit memberData={memberData} setIsEditing={setIsEditing} />;
  }

  return (
    <Center>
      <Box w={500} p={6} boxShadow="lg" borderRadius="md" bg="white">
        <Box mb={10} fontSize="2xl" fontWeight="bold" textAlign="center">
          회원 정보
        </Box>
        <Box>
          <FormControl>
            <InputGroup>
              <Input value={memberData.email || ""} readOnly />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <Input value={memberData.nickname || ""} readOnly />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <Input value={memberData.name || ""} readOnly />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <Input value={memberData.birthDate || ""} readOnly />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <Input value={memberData.phoneNumber || ""} readOnly />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <Input value={memberData.address || ""} readOnly />
            </InputGroup>
          </FormControl>
          <Button
            mt={5}
            width={"100%"}
            onClick={() => setIsEditing(true)}
            _hover={{ bgColor: "purple.500 ", color: "white" }}
          >
            수정 <FontAwesomeIcon icon={faEdit} />
          </Button>
        </Box>
      </Box>
    </Center>
  );
}
