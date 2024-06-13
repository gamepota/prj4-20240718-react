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
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export function MemberEdit(props) {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("male");
  const [nationality, setNationality] = useState("korean");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isBirthDateValid, setIsBirthDateValid] = useState(false);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();

  const [showPassword, setShowPassword] = useState(false);
  const isPasswordRight = password === confirmPassword;
  const formattedBirthDate =
    birthDate.slice(0, 4) +
    "-" +
    birthDate.slice(4, 6) +
    "-" +
    birthDate.slice(6, 8);
  const fullAddress = postcode + " " + address + " " + addressDetail;

  // 기존 회원 정보를 가져오기 위한 useEffect
  useEffect(() => {
    axios
      .put(`/api/member/${id}`)
      .then((res) => {
        const memberData = res.data;
        setEmail(memberData.email);
        setNickname(memberData.nickname);
        setGender(memberData.gender);
        setNationality(memberData.nationality);
        setName(memberData.name);
        setBirthDate(memberData.birthDate.replace(/-/g, "")); // YYYY-MM-DD 형식을 YYYYMMDD로 변환
        setPhoneNumber(memberData.phoneNumber);
        setPostcode(memberData.postcode);
        setAddress(memberData.address);
        setAddressDetail(memberData.addressDetail);
        setIsNicknameValid(true); // 초기 로딩 시 유효성 검사 통과된 것으로 간주, 이하 동일
        setIsNameValid(true);
        setIsBirthDateValid(true);
        setIsPhoneNumberValid(true);
      })
      .catch((err) => {
        Swal.fire({
          title: "회원 정보를 불러오는 데 실패했습니다.",
          text: "오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
          icon: "error",
          confirmButtonText: "확인",
        });
      });
  }, [id]);

  const isFormValid =
    isNicknameValid &&
    isPasswordValid &&
    isPasswordRight &&
    gender &&
    nationality &&
    isNameValid &&
    isBirthDateValid &&
    isPhoneNumberValid &&
    postcode;

  // 닉네임 유효성 검사
  function validateNickname(nickname) {
    const nicknameRegex = /^[가-힣a-zA-Z0-9]{3,12}$/.test(nickname);
    setIsNicknameValid(nicknameRegex);
  }

  // 비밀번호 유효성 검사
  function validatePassword(password) {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/.test(
        password,
      );
    setIsPasswordValid(passwordRegex);
  }

  // 이름 유효성 검사
  function validateName(name) {
    const nameRegex = /^[가-힣]+$/.test(name);
    setIsNameValid(nameRegex);
  }

  // 생년월일 유효성 검사
  function validateBirthDate(date) {
    if (date.length !== 8) return false; // 길이가 8이 아니면 false 반환

    const year = parseInt(date.substring(0, 4), 10);
    const month = parseInt(date.substring(4, 6), 10);
    const day = parseInt(date.substring(6, 8), 10);
    const currentYear = new Date().getFullYear();

    if (year < 1900 || year > currentYear) return false; // 연도가 1900-현재 연도 범위가 아니면 false 반환
    if (month < 1 || month > 12) return false; // 월이 1-12 범위가 아니면 false 반환

    // 월별 일자
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2 && day === 29) {
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return true; // 윤년이면 true 반환
      }
      return false; // 윤년이 아니면 false 반환
    }
    if (day < 1 || day > daysInMonth[month - 1]) return false;
    return true; // 위 조건에 모두 부합하면 true 반환
  }

  // 연락처 유효성 검사
  function validatePhoneNumber(phoneNumber) {
    const phoneNumberRegex =
      /^01[0-9]{1}-[0-9]{3,4}-[0-9]{4}$/.test(phoneNumber) ||
      /^02-[0-9]{3,4}-[0-9]{4}$/.test(phoneNumber);
    return phoneNumberRegex;
  }

  // 이름 입력 처리
  function handleNameChange(e) {
    const name = e.target.value.trim();
    setName(name);
    validateName(name);
  }

  // 생년월일 입력 처리
  function handleBirthDateChange(e) {
    const birthDateRegex = e.target.value.replace(/[^0-9]/g, "").slice(0, 8); // 숫자만 입력받고 8자리로 제한
    setBirthDate(birthDateRegex);

    // 유효성 검사 호출
    const isValid = validateBirthDate(birthDateRegex);
    setIsBirthDateValid(isValid);
  }

  // 연락처 입력 처리
  function handlePhoneNumberChange(e) {
    const phoneNumberRegex = e.target.value
      .replace(/[^0-9]/g, "") // 숫자만 입력받기
      .replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]{3,4})([0-9]{4})/g, "$1-$2-$3");
    setPhoneNumber(phoneNumberRegex);

    // 유효성 검사 호출
    const isValid = validatePhoneNumber(phoneNumberRegex);
    setIsPhoneNumberValid(isValid);
  }

  // 비밀번호 보기/숨기기
  function handleClickPassword() {
    setShowPassword(!showPassword);
  }

  // 성별 선택
  function handleGenderSelect(selectedGender) {
    setGender(selectedGender);
  }

  // 국적 선택
  function handleNationalitySelect(selectedNationality) {
    setNationality(selectedNationality);
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

  // 제출
  function handleSubmit() {
    const updatedData = {
      name: name,
      nickname: nickname,
      password: password,
      gender: gender,
      nationality: nationality,
      birthDate: formattedBirthDate,
      phoneNumber: phoneNumber,
      address: fullAddress,
    };
    axios
      .put(`/api/member/${id}`, updatedData) // PUT 요청으로 업데이트
      .then((res) => {
        Swal.fire({
          title: "회원 정보가 업데이트되었습니다.",
          text: "마이페이지로 이동합니다.",
          icon: "success",
          confirmButtonText: "확인",
        }).then(() => {
          navigate(`/member/mypage/${id}`); // 회원 상세 정보 페이지로 이동
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "회원 정보 업데이트에 실패하였습니다.",
          text: "오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
          icon: "error",
          confirmButtonText: "확인",
        });
      });
  }

  return (
    <>
      <Center>
        <Box w={500} p={6} boxShadow="lg" borderRadius="md" bg="white">
          <Box mb={10} fontSize="2xl" fontWeight="bold" textAlign="center">
            회원 정보 수정
          </Box>
          <Box>
            <FormControl isRequired>
              <InputGroup>
                <Input
                  placeholder={"이메일"}
                  value={email}
                  readOnly // 이메일 필드를 읽기 전용으로 설정
                  backgroundColor={"gray.200"}
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <InputGroup>
                <Input
                  placeholder={"닉네임"}
                  value={nickname}
                  onChange={(e) => {
                    setNickname(e.target.value.trim());
                    validateNickname(e.target.value.trim());
                  }}
                />
                <InputRightElement w={"100px"} mr={1}>
                  <Button
                    size={"sm"}
                    variant="ghost"
                    onClick={() => {
                      setNickname("");
                      setIsNicknameValid(false);
                    }}
                    _hover={{ color: "red.500 " }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </InputRightElement>
              </InputGroup>
              {!isNicknameValid && nickname && (
                <Alert status="error" mt={2}>
                  <AlertIcon />
                  닉네임은 3~12자 사이의 한글, 영문, 숫자로 구성되어야 합니다.
                </Alert>
              )}
            </FormControl>
            <FormControl>
              <InputGroup>
                <Input
                  placeholder="비밀번호"
                  value={password}
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    setPassword(e.target.value.trim());
                    validatePassword(e.target.value);
                  }}
                />
                <InputRightElement width="4.5rem">
                  {password && (
                    <Button h="1.75rem" size="sm" onClick={handleClickPassword}>
                      {showPassword ? "숨기기" : "보기"}
                    </Button>
                  )}
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                {password && (
                  <Input
                    placeholder="비밀번호 확인"
                    value={confirmPassword}
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value.trim());
                    }}
                  />
                )}
              </InputGroup>
              {!isPasswordValid && password && (
                <Alert status="error" mt={2}>
                  <AlertIcon />
                  비밀번호는 최소 8자에서 최대 16자 사이
                  <br />
                  영문 대소문자, 숫자, 특수문자를 포함해야 합니다.
                </Alert>
              )}
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
                    onClick={() => handleGenderSelect("male")}
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
                    onClick={() => handleGenderSelect("female")}
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
                    onClick={() => handleNationalitySelect("korean")}
                    cursor="pointer"
                    _hover={{ bg: "green.200" }}
                  >
                    내국인
                  </Button>
                  <Button
                    w="100px"
                    h="40px"
                    border="1px solid"
                    borderColor={
                      nationality === "foreigner" ? "orange" : "gray"
                    }
                    bg={nationality === "foreigner" ? "orange.100" : "white"}
                    onClick={() => handleNationalitySelect("foreigner")}
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
                onChange={handleNameChange}
              />
              {!isNameValid && name && (
                <Alert status="error" mt={2}>
                  <AlertIcon />
                  이름은 한글만 입력 가능합니다.
                </Alert>
              )}
            </FormControl>
            <FormControl isRequired>
              <Input
                placeholder="생년월일 8자리 ( YYYYMMDD )"
                value={birthDate}
                onChange={handleBirthDateChange}
              />
              {!isBirthDateValid && birthDate && (
                <Alert status="error" mt={2}>
                  <AlertIcon />
                  올바르지 않은 생년월일 형식입니다.
                </Alert>
              )}
            </FormControl>
            <FormControl isRequired>
              <Input
                placeholder="연락처 ( '-' 제외하고 입력 )"
                type="tel"
                value={phoneNumber}
                maxLength={13}
                onChange={handlePhoneNumberChange}
              />
              {!isPhoneNumberValid && phoneNumber && (
                <Alert status="error" mt={2}>
                  <AlertIcon />
                  올바르지 않은 연락처 형식입니다.
                </Alert>
              )}
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
                    onClick={openPostcodePopup}
                  >
                    주소 검색
                  </Button>
                </Box>
              </Flex>
              <Input
                value={addressDetail}
                onChange={(e) => {
                  setAddressDetail(e.target.value);
                }}
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
            수정
          </Button>
        </Box>
      </Center>
    </>
  );
}
