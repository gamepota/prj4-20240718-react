import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function MemberSignup(props) {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [nationality, setNationality] = useState("korean");
  const [birth_date, setBirth_date] = useState("");
  const [phone_number, setPhone_number] = useState("");

  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  const navigate = useNavigate();

  // 이메일 유효성 검사
  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/.test(email);
    if (emailRegex) {
      setIsEmailValid(true);
    }
    console.log(emailRegex);
  }

  // 비밀번호 유효성 검사
  function validatePassword(password) {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        password,
      );
    if (passwordRegex) {
      setIsPasswordValid(true);
    }
    console.log(passwordRegex);
  }

  // 계정 중복확인
  function handleCheckEmail() {
    axios
      .get(`/api/member/check?email=${email}`)
      .then((res) => {
        toast({
          status: "warning",
          description: "사용할 수 없는 이메일입니다.",
          position: "top",
        });
      }) // 이미 있는 이메일 (사용 못함)
      .catch((err) => {
        if (err.response.status === 404) {
          // 사용할 수 있는 이메일
          toast({
            status: "info",
            description: "사용할 수 있는 이메일입니다.",
            position: "top",
          });
        }
      })
      .finally();
  }

  function handleCheckNickname() {
    axios
      .get(`/api/member/check?nickname=${nickname}`)
      .then((res) => {
        toast({
          status: "warning",
          description: "사용할 수 없는 닉네임입니다.",
          position: "top",
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "info",
            description: "사용할 수 있는 별명입니다.",
            position: "top",
          });
        }
      })
      .finally();
  }

  // 비밀번호 보기/숨기기
  function handleClickPassword() {
    setShowPassword(!showPassword);
  }

  // 주소 검색
  function openPostcodePopup() {
    const postcodePopup = new window.daum.Postcode({
      onComplete: function (data) {
        setAddress(data.address);
        setPostcode(data.zonecode);
      },
    });
    postcodePopup.open();
  }

  const handleSubmit = () => {
    // 폼 검증 로직 등을 추가하고 유효성 검사 후 경로 이동
    if (isEmailValid && password === confirmPassword) {
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

  // 성별 선택 핸들러
  function handleGenderSelect(selectedGender) {
    setGender(selectedGender);
  }

  // 국적 선택 핸들러
  function handleNationalitySelect(selectedNationality) {
    setNationality(selectedNationality);
  }

  // 생년월일 입력 핸들러
  function handleBirthDateChange(e) {
    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 8); // 숫자만 입력받고 8자리로 제한
    setBirth_date(value);
  }

  return (
    <>
      <Center>
        <Box w={500}>
          <Box mb={3} border={"1px solid red"}>
            <FormControl isRequired>
              <InputGroup>
                <Input
                  type="email"
                  placeholder={"이메일"}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateEmail(e.target.value);
                  }}
                />{" "}
                <InputRightElement w={"75px"} mr={1}>
                  <Button onClick={handleCheckEmail} size={"sm"}>
                    중복확인
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <InputGroup>
                <Input
                  placeholder={"닉네임"}
                  onChange={(e) => {
                    setNickname(e.target.value);
                  }}
                />
                <InputRightElement w={"75px"} mr={1}>
                  <Button size={"sm"} onClick={handleCheckNickname}>
                    중복확인
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <InputGroup>
                <Input
                  placeholder="비밀번호"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClickPassword}>
                    {showPassword ? "숨기기" : "보기"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <InputGroup>
                <Input
                  placeholder="비밀번호 확인"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
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
                <Flex justifyContent={"space-around"} mt={4} mb={4}>
                  <Box
                    w="100px"
                    h="40px"
                    border="1px solid"
                    borderColor={gender === "male" ? "blue" : "gray"}
                    bg={gender === "male" ? "blue.100" : "white"}
                    onClick={() => handleGenderSelect("male")}
                    cursor="pointer"
                    textAlign="center"
                    lineHeight="40px"
                    borderRadius="5px"
                    mx={2}
                  >
                    남성
                  </Box>
                  <Box
                    w="100px"
                    h="40px"
                    border="1px solid"
                    borderColor={gender === "female" ? "pink" : "gray"}
                    bg={gender === "female" ? "pink.100" : "white"}
                    onClick={() => handleGenderSelect("female")}
                    cursor="pointer"
                    textAlign="center"
                    lineHeight="40px"
                    borderRadius="5px"
                    mx={2}
                  >
                    여성
                  </Box>
                </Flex>
              </FormControl>
              <Box border={"1px solid #f1f1f1"}></Box>
              <FormControl isRequired>
                <Flex justifyContent={"space-around"} mt={4} mb={4}>
                  <Box
                    w="100px"
                    h="40px"
                    border="1px solid"
                    borderColor={nationality === "korean" ? "green" : "gray"}
                    bg={nationality === "korean" ? "green.100" : "white"}
                    onClick={() => handleNationalitySelect("korean")}
                    cursor="pointer"
                    textAlign="center"
                    lineHeight="40px"
                    borderRadius="5px"
                    mx={2}
                  >
                    내국인
                  </Box>
                  <Box
                    w="100px"
                    h="40px"
                    border="1px solid"
                    borderColor={
                      nationality === "foreigner" ? "orange" : "gray"
                    }
                    bg={nationality === "foreigner" ? "orange.100" : "white"}
                    onClick={() => handleNationalitySelect("foreigner")}
                    cursor="pointer"
                    textAlign="center"
                    lineHeight="40px"
                    borderRadius="5px"
                    mx={2}
                  >
                    외국인
                  </Box>
                </Flex>
              </FormControl>
            </Flex>
            <FormControl>
              <Input
                placeholder="생년월일 8자리 ( YYYYMMDD )"
                maxLength={8}
                value={birth_date}
                onChange={handleBirthDateChange}
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
