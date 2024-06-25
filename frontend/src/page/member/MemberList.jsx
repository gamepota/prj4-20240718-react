import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../component/LoginProvider";

export function MemberList() {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();
  const { memberInfo } = useContext(LoginContext);

  useEffect(() => {
    if (memberInfo?.id === "1") {
      fetchMembers();
    } else {
      setIsLoading(false);
    }
  }, [memberInfo]);

  function fetchMembers() {
    axios
      .get("/api/member/list")
      .then((response) => {
        setMembers(response.data);
      })
      .catch((error) => {
        toast({
          status: "error",
          description: "회원 목록을 가져오는 데 실패했습니다.",
          position: "top",
          duration: 3000,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleDeleteMember(id) {
    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "삭제된 회원은 복구할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/member/${id}`, {
            headers: {
              memberInfoId: memberInfo.id,
            },
            withCredentials: true,
          })
          .then(() => {
            toast({
              status: "success",
              description: "회원이 삭제되었습니다.",
              position: "top",
              duration: 3000,
            });
            fetchMembers();
          })
          .catch((error) => {
            toast({
              status: "error",
              description: "회원 삭제에 실패했습니다.",
              position: "top",
              duration: 3000,
            });
          });
      }
    });
  }

  if (isLoading) {
    return (
      <Center mt={10}>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (memberInfo === null || memberInfo?.id !== "1") {
    return (
      <Center mt={10}>
        <Text fontSize="xl" fontWeight="bold" color="red.500">
          접근 권한이 없습니다.
        </Text>
      </Center>
    );
  }

  return (
    <Center>
      <Box
        w="100%"
        maxW="1200px"
        p={6}
        boxShadow="lg"
        borderRadius="md"
        bg="white"
      >
        <Box mb={10} fontSize="2xl" fontWeight="bold" textAlign="center">
          관리자 모드
        </Box>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>이메일</Th>
              <Th>닉네임</Th>
              <Th>성별</Th>
              <Th>생년월일</Th>
              <Th>가입일시</Th>
              <Th>회원 관리</Th>
            </Tr>
          </Thead>
          <Tbody>
            {members.map((member) => (
              <Tr key={member.id}>
                <Td>{member.id}</Td>
                <Td>{member.username}</Td>
                <Td>{member.nickname}</Td>
                <Td>{member.gender === "male" ? "남성" : "여성"}</Td>
                <Td>{member.birthDate}</Td>
                <Td>{member.inserted}</Td>
                <Td display={"flex"}>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => navigate(`/member/edit/${member.id}`)}
                    mr={2}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDeleteMember(member.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Center>
  );
}
