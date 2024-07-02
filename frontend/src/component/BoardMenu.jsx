import React, { useContext } from "react";
import { Menu, MenuButton, MenuItem, MenuList, Button, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {LoginContext} from "./LoginProvider.jsx";
import {ChevronDownIcon, ChevronUpIcon} from "@chakra-ui/icons";


const BoardMenu = ({ isOpen, onOpen, onClose }) => {
  const navigate = useNavigate();
  const { memberInfo } = useContext(LoginContext);

  return (
    <Box
      textAlign="center"
      m="auto"
      fontSize="lg"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <Menu isOpen={isOpen}>
        <MenuButton
          as={Button}
          rightIcon={isOpen ? <ChevronDownIcon/> : <ChevronUpIcon />}
          bg="purple.100"
          _hover={{ cursor: "pointer", bgColor: "purple.200" }}
          color="black"
          fontWeight="medium"
          size="md"
          p={4}
        >
          게시판
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
  );
}

export default BoardMenu;
