import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";

export function SignupStepB(props) {
  /* 회원 폼 상태 */
  const [gender, setGender] = useState("");
  const [birth_date, setBirth_date] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [family, setFamily] = useState(["none"]);
  const [isEmailValidated, setEmailValidated] = useState(false);
  const [show, setShow] = useState(false);

  return (
    <>
      <Center>
        <Box w={500}>
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
          <Button>이전</Button>
          <Button>다음</Button>
        </Box>
      </Center>
    </>
  );
}
