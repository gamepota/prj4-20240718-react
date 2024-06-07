import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

export function SignupStepA(props) {
  /* 회원 폼 상태 */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPassword_confirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [isEmailValidated, setEmailValidated] = useState(false);
  const [show, setShow] = useState(false);

  function validateEmail(email) {
    const hasAvailableRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/.test(
      email,
    );
    if (hasAvailableRegex) {
      setEmailValidated(true);
    }
    console.log(hasAvailableRegex);
  }

  const handleFamilyChange = (value) => {
    if (value.includes("none")) {
      value.splice(0, value.length);
      setFamily(["none"]);
    } else {
      setFamily(value.filter((val) => val !== "none"));
    }
    console.log(value);
  };

  const handleClick = () => setShow(!show);

  return (
    <>
      <Center>
        <Box w={500}>
          <FormControl isRequired>
            <FormLabel>이메일</FormLabel>
            <Input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>닉네임</FormLabel>
            <Input
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>패스워드</FormLabel>
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>패스워드 확인</FormLabel>
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                onChange={(e) => {
                  setPassword_confirm(e.target.value);
                }}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button>다음</Button>
        </Box>
      </Center>
    </>
  );
}
