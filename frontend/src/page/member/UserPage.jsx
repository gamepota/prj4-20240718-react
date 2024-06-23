import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
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
import { AddIcon } from "@chakra-ui/icons"; // AddIcon 추가

export function UserPage() {
  const { id } = useParams();
  const { memberInfo, setMemberInfo } = useContext(LoginContext);
  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  // 회원 정보 가져오기
  useEffect(() => {
    async function fetchMemberData() {
      try {
        const res = await axios.get(`/api/member/${id}`);
        const memberData = res.data;
        setUsername(memberData.username);
        setNickname(memberData.nickname);
        setProfileImage(memberData.profileImage);
      } catch (err) {
        Swal.fire({
          title: "회원 정보를 불러오는 데 실패했습니다.",
          text: "오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
          icon: "error",
          confirmButtonText: "확인",
        });
      }
    }

    fetchMemberData();
  }, [id]);

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
  function handleProfileImageDelete() {
    setProfileImage(null);
    setImageFile(null);
  }

  // 회원 정보 수정 페이지로 이동
  function handleEdit() {
    navigate(`/member/edit/${id}`);
  }

  // 회원 탈퇴
  async function handleDeleteAccount() {
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
      });

      if (password) {
        try {
          const res = await axios.post(
            `/api/member/validate-password`,
            { password },
            {
              withCredentials: true,
            },
          );

          if (res.status === 200 && res.data.valid) {
            Swal.fire({
              title: "회원 탈퇴",
              text: "정말로 탈퇴하시겠습니까?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "탈퇴",
              cancelButtonText: "취소",
            }).then(async (result) => {
              if (result.isConfirmed) {
                try {
                  await axios.delete(`/api/member/${id}`);
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
            });
          } else {
            Swal.fire({
              title: "비밀번호 오류",
              text: "비밀번호가 올바르지 않습니다.",
              icon: "error",
              confirmButtonText: "확인",
            });
          }
        } catch (err) {
          Swal.fire({
            title: "오류",
            text: "오류가 발생하였습니다.",
            icon: "error",
            confirmButtonText: "확인",
          });
        }
      }
    }
  }

  // 프로필 이미지 저장
  function handleSaveProfileImage() {
    if (imageFile) {
      const formData = new FormData();
      formData.append("profileImage", imageFile);

      axios
        .post(`/api/member/profile/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          toast({
            title: "프로필 이미지가 저장되었습니다.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });

          // 프로필 이미지 업데이트
          setProfileImage(res.data.profileImage);
        })
        .catch((err) => {
          Swal.fire({
            title: "프로필 이미지 저장 실패",
            text: "오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
            icon: "error",
            confirmButtonText: "확인",
          });
        });
    }
  }

  return (
    <Center>
      <Box w={500} p={6} boxShadow="lg" borderRadius="md" bg="white">
        <Box mb={10} fontSize="2xl" fontWeight="bold" textAlign="center">
          마이페이지
        </Box>
        <FormControl mb={4}>
          <Box textAlign="center" mb={4}>
            {profileImage ? (
              <>
                <Image
                  src={profileImage}
                  alt="프로필 이미지"
                  boxSize="150px"
                  borderRadius="full"
                  mx="auto"
                  mb={4}
                />
                <Button
                  bg="red.500"
                  color="white"
                  _hover={{ bg: "red.600" }}
                  onClick={handleProfileImageDelete}
                  mb={4}
                >
                  이미지 삭제
                </Button>
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
          <Button
            width="100%"
            bg="purple.500"
            color="white"
            _hover={{ bg: "purple.600" }}
            mb={4}
            onClick={handleSaveProfileImage}
            isDisabled={!imageFile}
          >
            프로필 이미지 저장
          </Button>
          <Box fontWeight="bold" mb={2}>
            이메일:
          </Box>
          <Box mb={4}>{username}</Box>
          <Box fontWeight="bold" mb={2}>
            닉네임:
          </Box>
          <Box mb={4}>{nickname}</Box>
          <Flex justifyContent="space-between">
            <Button
              bg="blue.500"
              color="white"
              _hover={{ bg: "blue.600" }}
              onClick={handleEdit}
            >
              회원 정보 수정
            </Button>
            <Button
              bg="red.500"
              color="white"
              _hover={{ bg: "red.600" }}
              onClick={handleDeleteAccount}
            >
              회원 탈퇴
            </Button>
          </Flex>
        </FormControl>
      </Box>
    </Center>
  );
}
