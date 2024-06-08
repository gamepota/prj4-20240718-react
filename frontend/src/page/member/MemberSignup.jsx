import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function MemberSignup(props) {
  const [email, setEmail] = useState("");
  const [isEmailValidated, setEmailValidated] = useState(false);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPassword_confirm] = useState("");
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("m");
  const [nationality, setNationality] = useState("korean");
  const [birth_date, setBirth_date] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [postcode, setPostcode] = useState("");
  const navigate = useNavigate();

  function validateEmail(email) {
    const hasAvailableRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/.test(
      email,
    );
    if (hasAvailableRegex) {
      setEmailValidated(true);
    }
    console.log(hasAvailableRegex);
  }

  const handleClick = () => setShow(!show);

  const openPostcodePopup = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setAddress(data.address);
        setPostcode(data.zonecode);
      },
    }).open();
  };

  const handleSubmit = () => {
    // 폼 검증 로직 등을 추가하고 유효성 검사 후 경로 이동
    if (isEmailValidated && password === password_confirm) {
      navigate("/signup/stepb");
    } else {
      // 오류 처리
      alert("입력정보를 확인해주세요.");
    }
  };

  function testFunction() {
    console.log(name);
    console.log(gender);
    console.log(nationality);
    console.log(birth_date);
    console.log(phone_number);
    console.log(postcode);
    console.log(address + " " + addressDetail);
  }

  return (
    <>
      <Center>
        <Box w={500}>
          <Box mb={3} border={"1px solid red"}>
            <FormControl isRequired>
              <Input
                type="email"
                placeholder={"아이디"}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <Input
                placeholder={"닉네임"}
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <InputGroup>
                <Input
                  placeholder="비밀번호"
                  type={show ? "text" : "password"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "숨기기" : "보기"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <InputGroup>
                <Input
                  placeholder="비밀번호 확인"
                  type={show ? "text" : "password"}
                  onChange={(e) => {
                    setPassword_confirm(e.target.value);
                  }}
                />
              </InputGroup>
            </FormControl>
          </Box>
          <Box border={"1px solid red"}>
            <FormControl isRequired>
              <Input
                placeholder="이름"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FormControl>
            <Flex>
              <FormControl isRequired>
                <RadioGroup defaultValue="m" onChange={setGender}>
                  <HStack spacing="30px">
                    <Radio value="m">남성</Radio>
                    <Radio value="f">여성</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
              <FormControl isRequired>
                <RadioGroup defaultValue="m" onChange={setNationality}>
                  <HStack spacing="30px">
                    <Radio value="korean">내국인</Radio>
                    <Radio value="foreigner">외국인</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
            </Flex>
            <FormControl>
              <Input
                placeholder="생년월일"
                type="date"
                onChange={(e) => {
                  setBirth_date(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="휴대폰 번호 ( -는 제외하고 입력 )"
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
              <Flex>
                <Input readOnly value={postcode} placeholder="우편번호" />
                <Button onClick={openPostcodePopup}>주소 검색</Button>
              </Flex>
              <Input
                readOnly
                value={address}
                placeholder="주소를 선택하세요."
              />
              <Input
                value={addressDetail}
                onChange={(e) => {
                  setAddressDetail(e.target.value);
                }}
                placeholder="상세주소 입력"
              />
            </FormControl>
          </Box>
          <Button
            onClick={() => {
              navigate("/signup/stepa");
            }}
          >
            이전
          </Button>
          <Button onClick={handleSubmit}>다음</Button>
          <Button onClick={testFunction}>test</Button>
        </Box>
      </Center>
    </>
  );
}
