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
      navigate("/unauthorized");
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
          setProfileImage(memberData.profileImage);
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
        setProfileImage(res.data.profileImage);
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

  function handleEdit() {
    navigate(`/member/edit/${id}`);
  }

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
              memberInfoId: memberInfo.id,
            },
            withCredentials: true,
          });
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
      <Box
        w={[300, 500, 700]}
        p={8}
        boxShadow="lg"
        borderRadius="md"
        bg="white"
      >
        <Box mb={10} fontSize="3xl" fontWeight="bold" textAlign="center">
          마이페이지
        </Box>
        <FormControl mb={6}>
          <Box textAlign="center" mb={6} position="relative">
            {profileImage ? (
              <>
                <Image
                  src={profileImage}
                  boxSize="200px"
                  borderRadius="full"
                  mx="auto"
                  mb={4}
                />
                <CloseButton
                  position="absolute"
                  top="0"
                  right="0"
                  size="lg"
                  color="red.500"
                  bg="white"
                  _hover={{ color: "red.600" }}
                  boxSize="32px"
                  onClick={handleProfileImageDelete}
                />
              </>
            ) : (
              <Box
                as="label"
                htmlFor="profileImageInput"
                bg="gray.200"
                borderRadius="full"
                boxSize="200px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                _hover={{ bg: "gray.300" }}
                mx="auto"
                mb={4}
              >
                <Icon as={AddIcon} w={12} h={12} color="gray.500" />
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
              mb={6}
              onClick={handleSaveProfileImage}
            >
              프로필 이미지 저장
            </Button>
          )}
          <Box fontWeight="bold" mb={3}>
            이메일:
          </Box>
          <Box mb={6}>{username}</Box>
          <Box fontWeight="bold" mb={3}>
            닉네임:
          </Box>
          <Box mb={6}>{nickname}</Box>
          <Flex flexDirection="column" alignItems="center">
            <Button
              width="100%"
              bg="blue.500"
              color="white"
              _hover={{ bg: "blue.600" }}
              mb={4}
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
                mb={4}
                onClick={handleDeleteMember}
              >
                회원 탈퇴
              </Button>
            )}
            {memberInfo && memberInfo.id === "1" && (
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
