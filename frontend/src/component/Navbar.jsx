import { Box, Button, Flex, Img, Input } from "@chakra-ui/react";
import React, { useContext } from "react";
import { LoginContext } from "./LoginProvider.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { generateDiaryId } from "../util/util.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export function Navbar() {
  const navigate = useNavigate();

  // LoginProvider
  const { memberInfo, setMemberInfo } = useContext(LoginContext);
  const access = memberInfo?.access || null;
  const nickname = memberInfo?.nickname || null;
  const isLoggedIn = Boolean(access);
  const diaryId = isLoggedIn ? generateDiaryId(memberInfo.id) : null;

  function handleLogout() {
    try {
      const formData = new FormData();
      formData.append("nickname", nickname);
      axios
        .post("/api/member/logout", formData, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.status === 200) {
            setMemberInfo(null); // 상태 초기화
            localStorage.removeItem("memberInfo"); // 로컬 스토리지 초기화
            navigate("/member/login");
          }
        });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  const handleOpenDiary = () => {
    const url = `/diary/${diaryId}`;
    const windowFeatures = "width=1400,height=800,max-width=800,max-height=600"; // 원하는 크기로 설정
    window.open(url, "_blank", windowFeatures);
  };

  return (
    <Flex
      h="50px"
      alignItems="center"
      justifyContent="space-between"
      px={5}
      bg="white"
      boxShadow="md"
    >
      <Flex gap={5}>
        <Box
          _hover={{ cursor: "pointer" }}
          p={2}
          borderRadius="md"
          onClick={() => navigate("/")}
          w="100px" // Box 크기 고정
          h="auto" // 높이를 자동으로 조정
        >
          <Img src={"/img/petmily.png"} w="100%" h="auto" />
        </Box>
        <Box
          _hover={{ cursor: "pointer", bgColor: "gray.200" }}
          p={2}
          borderRadius="md"
          onClick={() => navigate("/board/list")}
        >
          게시판
        </Box>
        <Box
          _hover={{ cursor: "pointer", bgColor: "gray.200" }}
          p={2}
          borderRadius="md"
          onClick={() => navigate("/place/map")}
        >
          동물병원 찾기
        </Box>
        <Box
          _hover={{ cursor: "pointer", bgColor: "gray.200" }}
          p={2}
          borderRadius="md"
          onClick={() => navigate("/board")}
        >
          반려동물 정보
        </Box>
        <Box
          _hover={{ cursor: "pointer", bgColor: "gray.200" }}
          p={2}
          borderRadius="md"
          onClick={() => navigate("/aichat")}
        >
          AI 수의사
        </Box>
      </Flex>
      <Flex gap={5} alignItems="center">
        <Flex>
          <Input
            type="text"
            placeholder="통합 검색"
            borderRadius="md"
            borderColor="gray.300"
          />
          <Button
            bgColor="purple.100"
            _hover={{ bgColor: "purple.200" }}
            ml={2}
          >
            검색
          </Button>
        </Flex>
        <Button
          bgColor="purple.100"
          _hover={{ bgColor: "purple.200" }}
          onClick={() => navigate("/board/write")}
        >
          새 글쓰기
        </Button>
        {isLoggedIn ? (
          <>
            <Box
              _hover={{ cursor: "pointer", bgColor: "gray.200" }}
              p={2}
              borderRadius="md"
              onClick={() => navigate(`/member/page/${memberInfo.id}`)}
            >
              {nickname}님
            </Box>
            <Box
              _hover={{ cursor: "pointer", bgColor: "gray.200" }}
              p={2}
              borderRadius="md"
              onClick={handleOpenDiary}
            >
              마이 펫다이어리
            </Box>
            <Button
              _hover={{ cursor: "pointer", bgColor: "gray.200" }}
              p={2}
              borderRadius="md"
              onClick={handleLogout}
            >
              로그아웃
            </Button>
          </>
        ) : (
          <>
            <Button
              _hover={{ cursor: "pointer", bgColor: "gray.200" }}
              p={2}
              borderRadius="md"
              onClick={() => navigate("/member/login")}
            >
              로그인
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
}
