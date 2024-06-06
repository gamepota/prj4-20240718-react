import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";

export function MemberSignup(props) {
  /* 회원 폼 상태 */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPassword_confirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");
  const [birth_date, setBirth_date] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [family, setFamily] = useState(["none"]);
  const [isEmailValidated, setEmailValidated] = useState(false);

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

  function handleSignup() {
    axios.post("/api/member/signup", {
      email,
      password,
      nickname,
      gender,
      birth_date,
      phone_number,
      family,
    });
  }

  return (
    <>
      <Box>회원가입</Box>
      <Box>
        <FormControl isRequired>
          <FormLabel>계정</FormLabel>
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
          <Input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>패스워드 확인</FormLabel>
          <Input
            type="password"
            onChange={(e) => {
              setPassword_confirm(e.target.value);
            }}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>생년월일</FormLabel>
          <Input
            onChange={(e) => {
              setBirth_date(e.target.value);
            }}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>성별</FormLabel>
          <RadioGroup defaultValue="m" onChange={setGender}>
            <HStack spacing="24px">
              <Radio value="m">남자</Radio>
              <Radio value="f">여자</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>휴대폰 번호</FormLabel>
          <Input
            type="tel"
            maxLength={"15"}
            onChange={(e) => {
              setPhone_number(
                (e.target.value = e.target.value
                  .replace(/[^0-9]/g, "")
                  .replace(
                    /(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g,
                    "$1-$2-$3",
                  )),
              );
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>나의 가족</FormLabel>
          <CheckboxGroup
            colorScheme="cyan"
            value={family}
            onChange={handleFamilyChange}
          >
            <Stack spacing={[1, 5]} direction={["column", "row"]}>
              <Checkbox value="none">없음</Checkbox>
              <Checkbox value="dog" isDisabled={family.includes("none")}>
                강아지
              </Checkbox>
              <Checkbox value="cat" isDisabled={family.includes("none")}>
                고양이
              </Checkbox>
              <Checkbox value="bird" isDisabled={family.includes("none")}>
                조류
              </Checkbox>
              <Checkbox value="fish" isDisabled={family.includes("none")}>
                어류
              </Checkbox>
              <Checkbox value="reptile" isDisabled={family.includes("none")}>
                파충류
              </Checkbox>
              <Checkbox value="amphibian" isDisabled={family.includes("none")}>
                양서류
              </Checkbox>
              <Checkbox value="rodent" isDisabled={family.includes("none")}>
                설치류
              </Checkbox>
              <Checkbox value="etc" isDisabled={family.includes("none")}>
                기타 동물
              </Checkbox>
            </Stack>
          </CheckboxGroup>
        </FormControl>
        <Button onClick={handleSignup}>가입</Button>
      </Box>
    </>
  );
}
