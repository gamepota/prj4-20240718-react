import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Spinner,
  Table,
  Tbody,
  Td,
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

export function MemberList() {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  // 회원 목록 가져오기
  useEffect(() => {
    fetchMembers(setMembers, setIsLoading, toast);
  }, []);

  function fetchMembers(setMembers, setIsLoading, toast) {
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

  // 회원 삭제
  function handleDeleteMember(
    memberId,
    fetchMembers,
    toast,
    setMembers,
    setIsLoading,
  ) {
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
          .delete(`/api/member/${memberId}`)
          .then(() => {
            toast({
              status: "success",
              description: "회원이 삭제되었습니다.",
              position: "top",
              duration: 3000,
            });
            fetchMembers(setMembers, setIsLoading, toast); // 삭제 후 목록 새로고침
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

  return (
    <>
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
            회원 목록
          </Box>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>이메일</Th>
                <Th>닉네임</Th>
                <Th>성별</Th>
                <Th>생년월일</Th>
                <Th>회원등급</Th>
                <Th>가입일시</Th>
              </Tr>
            </Thead>
            <Tbody>
              {members.map((member) => (
                <Tr key={member.id}>
                  <Td>{member.email}</Td>
                  <Td>{member.nickname}</Td>
                  <Td>{member.gender === "male" ? "남" : "여"}</Td>
                  <Td>{member.birthDate}</Td>
                  <Td>{member.role}</Td>
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
    </>
  );
}
