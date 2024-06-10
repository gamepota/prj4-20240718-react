import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export function MemberSignup(props) {
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

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isNicknameConfirmed, setIsNicknameConfirmed] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isBirthDateValid, setIsBirthDateValid] = useState(false);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const isPasswordRight = password === confirmPassword;
  const formattedBirthDate =
    birthDate.slice(0, 4) +
    "-" +
    birthDate.slice(4, 6) +
    "-" +
    birthDate.slice(6, 8);
  const fullAddress = postcode + " " + address + " " + addressDetail;

  const isFormValid =
    isEmailValid &&
    isEmailConfirmed &&
    isNicknameValid &&
    isNicknameConfirmed &&
    isPasswordValid &&
    isPasswordRight &&
    gender &&
    nationality &&
    name &&
    isBirthDateValid &&
    isPhoneNumberValid &&
    postcode;

  /* 유효성 */

  // 이메일 유효성 검사
  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/.test(email);
    setIsEmailValid(emailRegex);
  }

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

  // 생년월일 정규식
  function handleBirthDateChange(e) {
    const birthDateRegex = e.target.value.replace(/[^0-9]/g, "").slice(0, 8); // 숫자만 입력받고 8자리로 제한
    setBirthDate(birthDateRegex);

    // 유효성 검사 호출
    const isValid = validateBirthDate(birthDateRegex);
    setIsBirthDateValid(isValid);
  }

  // 휴대폰 번호 정규식
  function handlePhoneNumberChange(e) {
    const phoneNumberRegex = e.target.value
      .replace(/[^0-9]/g, "") // 숫자만 입력받기
      .replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]{3,4})([0-9]{4})/g, "$1-$2-$3");
    setPhoneNumber(phoneNumberRegex);

    // 유효성 검사 호출
    const isValid = validatePhoneNumber(phoneNumberRegex);
    setIsPhoneNumberValid(isValid);
  }

function MemberSignup(props) {
  return <div></div>;
}

export default MemberSignup;
