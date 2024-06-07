import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";

export function SignupStepC(props) {
  /* 회원 폼 상태 */
  const [family, setFamily] = useState([""]);

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
      <Center>
        <Box w={500}>
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
                <Checkbox
                  value="amphibian"
                  isDisabled={family.includes("none")}
                >
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
          <Button>이전</Button>
          <Button onClick={handleSignup}>가입</Button>
        </Box>
      </Center>
    </>
  );
}
