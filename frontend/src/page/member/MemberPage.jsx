import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  CloseButton,
  Flex,
  FormControl,
  Icon,
  Image,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { LoginContext } from "../../component/LoginProvider.jsx";
import { AddIcon } from "@chakra-ui/icons";

export function MemberPage() {
  const { id } = useParams();
  const { memberInfo, setMemberInfo } = useContext(LoginContext);
  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [hasProfileImage, setHasProfileImage] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (!memberInfo || memberInfo.id !== id) {
      navigate("/unauthorized"); // 접근 권한이 없을 때 리디렉션할 페이지
      return;
    }

    async function fetchMemberData() {
      try {
        const res = await axios.get(`/api/member/${id}`);
        const memberData = res.data;
        setUsername(memberData.username);
        setNickname(memberData.nickname);
        setProfileImage(memberData.imageUrl);
        if (memberData.profileImage) {
          setProfileImage(memberData.profileImage); // 프로필 이미지 URL 설정
          setHasProfileImage(true);
        }
      } catch (err) {
        console.error(err);
        Swal.fire({
          title: "회원 정보를 불러오는 데 실패했습니다.",
          text: "오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
          icon: "error",
          confirmButtonText: "확인",
        });
      }
    }

    fetchMemberData();
  }, [id, memberInfo, navigate]);

  // 프로필 이미지 업로드
  function handleProfileImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  // 프로필 이미지 삭제
  async function handleProfileImageDelete() {
    try {
      await axios.delete(`/api/member/profile/${id}`);
      setProfileImage(null);
      setImageFile(null);
      setHasProfileImage(false);
      toast({
        title: "프로필 이미지가 삭제되었습니다.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      Swal.fire({
        title: "프로필 이미지 삭제 실패",
        text: "오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
        icon: "error",
        confirmButtonText: "확인",
      });
    }
  }

  // 프로필 이미지 저장
  async function handleSaveProfileImage() {
    if (imageFile) {
      const formData = new FormData();
      formData.append("profileImage", imageFile);

      try {
        const res = await axios.post(`/api/member/profile/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast({
          title: res.data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        // 프로필 이미지 업데이트
        setProfileImage(res.data.profileImage); // 업데이트된 프로필 이미지 URL 설정
        setHasProfileImage(true);
        setImageFile(null);
      } catch (err) {
        Swal.fire({
          title: "프로필 이미지 저장 실패",
          text: "오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
          icon: "error",
          confirmButtonText: "확인",
        });
      }
    }
  }

  // 회원 정보 수정 페이지로 이동
  function handleEdit() {
    navigate(`/member/edit/${id}`);
  }

  // 회원 탈퇴
  async function handleDeleteMember() {
    const confirmDeletion = await Swal.fire({
      title: "회원 탈퇴",
      html: "모든 정보가 영구적으로 삭제됩니다.<br>정말 탈퇴하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "예",
      cancelButtonText: "아니오",
    });

    if (confirmDeletion.isConfirmed) {
      const { value: password } = await Swal.fire({
        title: "회원 탈퇴",
        text: "비밀번호를 입력해주세요.",
        input: "password",
        inputPlaceholder: "비밀번호",
        showCancelButton: true,
        confirmButtonText: "확인",
        cancelButtonText: "취소",
        inputValidator: (value) => {
          if (!value) {
            return "비밀번호를 입력해주세요!";
          }
        },
      });

      if (password) {
        try {
          const res = await axios.delete(`/api/member/${id}`, {
            params: { password },
            headers: {
              Authorization: `Bearer ${memberInfo.access}`,
            },
            withCredentials: true,
          });

          // 탈퇴 성공 처리
          toast({
            title: "탈퇴되었습니다.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setMemberInfo(null);
          localStorage.removeItem("memberInfo");
          navigate("/member/login");
        } catch (err) {
          Swal.fire({
            title: "탈퇴 실패",
            text: "오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
            icon: "error",
            confirmButtonText: "확인",
          });
        }
      }
    }
  }

  return (
    <Center mt={5}>
      <Box w={500} p={6} boxShadow="lg" borderRadius="md" bg="white">
        <Box mb={10} fontSize="2xl" fontWeight="bold" textAlign="center">
          마이페이지
        </Box>
        <FormControl mb={4}>
          <Box textAlign="center" mb={4} position="relative">
            {profileImage ? (
              <>
                <Image
                  src={profileImage}
                  boxSize="150px"
                  borderRadius="full"
                  mx="auto"
                  mb={4}
                />
                <CloseButton
                  position="absolute"
                  top="-10px"
                  right="100px"
                  size="lg"
                  color="red.200"
                  _hover={{ color: "red.500" }}
                  boxSize="24px"
                  onClick={handleProfileImageDelete}
                />
              </>
            ) : (
              <Box
                as="label"
                htmlFor="profileImageInput"
                bg="gray.200"
                borderRadius="full"
                boxSize="150px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                _hover={{ bg: "gray.300" }}
                mx="auto"
                mb={4}
              >
                <Icon as={AddIcon} w={10} h={10} color="gray.500" />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageUpload}
                  display="none"
                  id="profileImageInput"
                />
              </Box>
            )}
          </Box>
          {!hasProfileImage && imageFile && (
            <Button
              width="100%"
              bg="purple.500"
              color="white"
              _hover={{ bg: "purple.600" }}
              mb={4}
              onClick={handleSaveProfileImage}
            >
              프로필 이미지 저장
            </Button>
          )}
          <Box fontWeight="bold" mb={2}>
            이메일:
          </Box>
          <Box mb={4}>{username}</Box>
          <Box fontWeight="bold" mb={2}>
            닉네임:
          </Box>
          <Box mb={4}>{nickname}</Box>
          <Flex flexDirection="column" alignItems="center">
            <Button
              width="100%"
              bg="blue.500"
              color="white"
              _hover={{ bg: "blue.600" }}
              mb={2}
              onClick={handleEdit}
            >
              정보 수정
            </Button>
            {memberInfo && memberInfo.id !== "1" && (
              <Button
                width="100%"
                bg="red.500"
                color="white"
                _hover={{ bg: "red.600" }}
                mb={2}
                onClick={handleDeleteMember}
              >
                회원 탈퇴
              </Button>
            )}
            {memberInfo && memberInfo.id === "1" && (
              // 관리자 전용
              <Button
                width="100%"
                bg="green.500"
                color="white"
                _hover={{ bg: "green.600" }}
                onClick={() => navigate("/member/list")}
              >
                관리자 모드
              </Button>
            )}
          </Flex>
        </FormControl>
      </Box>
    </Center>
  );
}
