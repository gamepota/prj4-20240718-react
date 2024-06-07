import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function SignupStepB(props) {
  /* 회원 폼 상태 */
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birth_date, setBirth_date] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [postcode, setPostcode] = useState("");
  const navigate = useNavigate();

  const openPostcodePopup = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setAddress(data.address);
        setPostcode(data.zonecode);
      },
    }).open();
  };

  function testFunction() {
    console.log(address + addressDetail);
  }

  return (
    <>
      <Center>
        <Box w={500}>
          <FormControl isRequired>
            <FormLabel>이름</FormLabel>
            <Input
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>성별</FormLabel>
            <RadioGroup defaultValue="m" onChange={setGender}>
              <HStack spacing="24px">
                <Radio value="m">남성</Radio>
                <Radio value="f">여성</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel>생년월일</FormLabel>
            <Input
              type="date"
              onChange={(e) => {
                setBirth_date(e.target.value);
              }}
            />
          </FormControl>
          <FormControl>
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
            <FormLabel>주소</FormLabel>
            <Flex>
              <Input readOnly value={postcode} placeholder="우편번호" />
              <Button onClick={openPostcodePopup}>주소 검색</Button>
            </Flex>
            <Input readOnly value={address} placeholder="주소를 선택하세요." />
            <Input
              value={addressDetail}
              onChange={(e) => {
                setAddressDetail(e.target.value);
              }}
              placeholder="상세주소 입력"
            />

            <Button onClick={testFunction}>test</Button>
          </FormControl>
          <Button
            onClick={() => {
              navigate("/signup/stepa");
            }}
          >
            이전
          </Button>
          <Button onClick={() => navigate("/signup/stepc")}>다음</Button>
        </Box>
      </Center>
    </>
  );
}
