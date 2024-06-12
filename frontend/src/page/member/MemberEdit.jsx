import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export function MemberEdit({ setIsEditing }) {
  const { id } = useParams(); // URL의 id 파라미터를 가져옵니다.
  const [memberData, setMemberData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();

  useEffect(() => {
    // 하드코딩된 테스트 데이터
    const testData = {
      email: "test@example.com",
      nickname: "testuser",
      name: "홍길동",
      birthDate: "19900101",
      phoneNumber: "010-1234-5678",
      address: "서울시 강남구 역삼동 123-45",
      postcode: "12345",
      addressDetail: "101호",
      gender: "male",
      nationality: "korean",
    };
    setMemberData(testData);
    setNickname(testData.nickname);
    setGender(testData.gender);
    setNationality(testData.nationality);
    setName(testData.name);
    setBirthDate(testData.birthDate);
    setPhoneNumber(testData.phoneNumber);
    setPostcode(testData.postcode);
    setAddress(testData.address);
    setAddressDetail(testData.addressDetail);
    setLoading(false);
  }, [id]);

  const isPasswordRight = password === confirmPassword;
  const isFormValid =
    nickname &&
    password &&
    isPasswordRight &&
    gender &&
    nationality &&
    name &&
    birthDate &&
    phoneNumber &&
    postcode;

  const handleClickPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    const updatedData = {
      email: memberData.email, // 이메일은 수정하지 않음
      nickname: nickname,
      password: password,
      gender: gender,
      nationality: nationality,
      name: name,
      birthDate: birthDate,
      phoneNumber: phoneNumber,
      address: postcode + " " + address + " " + addressDetail,
    };
    // 하드코딩
    console.log("Updating member data:", updatedData);
    Swal.fire({
      title: "회원 정보가 수정되었습니다.",
      text: "수정된 정보를 확인하세요.",
      icon: "success",
      confirmButtonText: "확인",
    }).then(() => {
      setIsEditing(false);
    });
  };

  if (loading) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Center>
    );
  }

  return (
    <Center>
      <Box w={500} p={6} boxShadow="lg" borderRadius="md" bg="white">
        <Box mb={10} fontSize="2xl" fontWeight="bold" textAlign="center">
          회원 정보 수정
        </Box>
        <Box>
          <FormControl isRequired>
            <InputGroup>
              <Input
                value={memberData.email || ""}
                readOnly
                placeholder="이메일"
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <InputGroup>
              <Input
                placeholder={"닉네임"}
                value={nickname}
                onChange={(e) => setNickname(e.target.value.trim())}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <InputGroup>
              <Input
                placeholder="비밀번호"
                value={password}
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value.trim())}
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
                value={confirmPassword}
                type={showPassword ? "text" : "password"}
                onChange={(e) => setConfirmPassword(e.target.value.trim())}
              />
            </InputGroup>
            {confirmPassword && (
              <Alert status={isPasswordRight ? "success" : "error"} mt={2}>
                <AlertIcon />
                {isPasswordRight
                  ? "비밀번호가 일치합니다."
                  : "비밀번호가 일치하지 않습니다."}
              </Alert>
            )}
          </FormControl>
          <Flex>
            <FormControl isRequired>
              <Flex justifyContent={"space-around"} mt={4} mb={4}>
                <Button
                  w="100px"
                  h="40px"
                  border="1px solid"
                  borderColor={gender === "male" ? "blue" : "gray"}
                  bg={gender === "male" ? "blue.100" : "white"}
                  onClick={() => setGender("male")}
                  cursor="pointer"
                  _hover={{ bg: "blue.200" }}
                >
                  남성
                </Button>
                <Button
                  w="100px"
                  h="40px"
                  border="1px solid"
                  borderColor={gender === "female" ? "red" : "gray"}
                  bg={gender === "female" ? "red.100" : "white"}
                  onClick={() => setGender("female")}
                  cursor="pointer"
                  _hover={{ bg: "red.200" }}
                >
                  여성
                </Button>
              </Flex>
            </FormControl>
            <FormControl isRequired>
              <Flex justifyContent={"space-around"} mt={4} mb={4}>
                <Button
                  w="100px"
                  h="40px"
                  border="1px solid"
                  borderColor={nationality === "korean" ? "green" : "gray"}
                  bg={nationality === "korean" ? "green.100" : "white"}
                  onClick={() => setNationality("korean")}
                  cursor="pointer"
                  _hover={{ bg: "green.200" }}
                >
                  한국인
                </Button>
                <Button
                  w="100px"
                  h="40px"
                  border="1px solid"
                  borderColor={nationality === "foreigner" ? "orange" : "gray"}
                  bg={nationality === "foreigner" ? "orange.100" : "white"}
                  onClick={() => setNationality("foreigner")}
                  cursor="pointer"
                  _hover={{ bg: "orange.200" }}
                >
                  외국인
                </Button>
              </Flex>
            </FormControl>
          </Flex>
          <FormControl isRequired>
            <Input
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value.trim())}
            />
          </FormControl>
          <FormControl isRequired>
            <Input
              placeholder="생년월일 8자리 ( YYYYMMDD )"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value.trim())}
            />
          </FormControl>
          <FormControl isRequired>
            <Input
              placeholder="연락처 ( '-' 제외하고 입력 )"
              type="tel"
              value={phoneNumber}
              maxLength={13}
              onChange={(e) => setPhoneNumber(e.target.value.trim())}
            />
          </FormControl>
          <FormControl isRequired>
            <Flex>
              <Flex width={"80%"} direction={"column"}>
                <Input readOnly value={postcode} placeholder="우편번호" />
                <Input readOnly value={address} placeholder="주소" />
              </Flex>
              <Box>
                <Button
                  _hover={{ bgColor: "purple.500 ", color: "white" }}
                  height={"100%"}
                  onClick={() => {
                    // 주소 검색 팝업 (개발 중이라 하드코딩된 값을 넣음)
                    setAddress("서울시 강남구 역삼동 123-45");
                    setPostcode("12345");
                  }}
                >
                  주소 검색
                </Button>
              </Box>
            </Flex>
            <Input
              value={addressDetail}
              onChange={(e) => setAddressDetail(e.target.value.trim())}
              placeholder="상세주소를 입력하세요."
            />
          </FormControl>
        </Box>
        <Button
          mt={5}
          width={"100%"}
          isDisabled={!isFormValid}
          cursor={!isFormValid ? "not-allowed" : "pointer"}
          _hover={
            !isFormValid
              ? { bgColor: "gray.100" }
              : { bgColor: "purple.500 ", color: "white" }
          }
          onClick={handleSubmit}
        >
          수정 완료
        </Button>
      </Box>
    </Center>
  );
}
