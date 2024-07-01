import {
  Box,
  Button,
  Flex,
  Img,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { LoginContext } from "./LoginProvider.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { generateDiaryId } from "../util/util.jsx";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

export function Navbar() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { memberInfo, setMemberInfo } = useContext(LoginContext);
  const access = memberInfo?.access || null;
  const nickname = memberInfo?.nickname || null;
  const isLoggedIn = Boolean(access);
  const diaryId = isLoggedIn ? generateDiaryId(memberInfo.id) : null;

  const handleLogout = async () => {
    try {
      const formData = new FormData();
      formData.append("nickname", nickname);
      const response = await axios.post("/api/member/logout", formData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setMemberInfo(null);
        localStorage.removeItem("memberInfo");
        navigate("/member/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleOpenDiary = () => {
    const url = `/diary/${diaryId}`;
    const windowFeatures = "width=1400,height=800,max-width=800,max-height=600";
    window.open(url, "_blank", windowFeatures);
  };

  return (
    <Flex
      minHeight={{ base: "120px", md: "100px" }}
      alignItems="center"
      justifyContent="space-between"
      px={5}
      py={{ base: 2, md: 0 }}
      bg="#F8F8FF"
      boxShadow="md"
      wrap="wrap"
    >
      <Flex alignItems="center" gap={5} wrap="wrap">
        <Box
          _hover={{ cursor: "pointer" }}
          p={2}
          borderRadius="md"
          onClick={() => navigate("/")}
          w="150px"
        >
          <Img src={"/img/petmily-logo.png"} w="100%" h="auto" />
        </Box>
        {isLargerThan768 && (
          <>
            <Box
              textAlign={"center"}
              m={"auto"}
              fontSize={"2xl"}
              onMouseEnter={onOpen}
              onMouseLeave={onClose}
            >
              <Menu isOpen={isOpen}>
                <MenuButton
                  as={Button}
                  rightIcon={isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
                  bg={"gray.700"}
                  color={"white"}
                  fontWeight={"bold"}
                  size={"lg"}
                  p={6}
                >
                  {`게시판`}
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      navigate("/board/list?boardType=전체");
                      onClose();
                    }}
                  >
                    전체 게시판
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/board/list?boardType=자유");
                      onClose();
                    }}
                  >
                    자유 게시판
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/board/list?boardType=사진 공유");
                      onClose();
                    }}
                  >
                    사진 공유 게시판
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/board/list?boardType=질문/답변");
                      onClose();
                    }}
                  >
                    질문/답변 게시판
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/board/list?boardType=반려동물 건강");
                      onClose();
                    }}
                  >
                    반려동물 건강 게시판
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/board/list?boardType=훈련/교육");
                      onClose();
                    }}
                  >
                    훈련/교육 게시판
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/board/list?boardType=리뷰");
                      onClose();
                    }}
                  >
                    리뷰 게시판
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/board/list?boardType=이벤트/모임");
                      onClose();
                    }}
                  >
                    이벤트/모임 게시판
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/board/list?boardType=반려동물 정보");
                      onClose();
                    }}
                  >
                    반려동물 정보 게시판
                  </MenuItem>
                  {memberInfo && memberInfo.id === 1 && (
                    <MenuItem
                      onClick={() => {
                        navigate("/board/list/report");
                        onClose();
                      }}
                    >
                      신고 게시판
                    </MenuItem>
                  )}
                </MenuList>
              </Menu>
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
              onClick={() => navigate("/board/list?boardType=반려동물 정보")}
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
          </>
        )}
      </Flex>
      <Flex gap={5} alignItems="center" wrap="wrap">
        {isLargerThan768 ? (
          <>
            <Flex alignItems="center">
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
          </>
        ) : (
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              메뉴
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => navigate("/")}>홈</MenuItem>
              <MenuItem onClick={() => navigate("/place/map")}>
                동물병원 찾기
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/board/list?boardType=반려동물 정보")}
              >
                반려동물 정보
              </MenuItem>
              <MenuItem onClick={() => navigate("/aichat")}>AI 수의사</MenuItem>
              {isLoggedIn ? (
                <>
                  <MenuItem
                    onClick={() => navigate(`/member/page/${memberInfo.id}`)}
                  >
                    {nickname}님
                  </MenuItem>
                  <MenuItem onClick={handleOpenDiary}>다이어리</MenuItem>
                  <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
                </>
              ) : (
                <MenuItem onClick={() => navigate("/member/login")}>
                  로그인
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        )}
      </Flex>
    </Flex>
  );
}
