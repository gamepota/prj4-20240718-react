import React from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

export function MemberLogin(props) {
  return (
    <>
      <Center>
        <Box w={500}>
          <Box mb={10}>회원 로그인</Box>
          <Box>
            <Box>
              <FormControl>
                <FormLabel>이메일</FormLabel>
                <Input />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>비밀번호</FormLabel>
                <Input type="password" />
              </FormControl>
            </Box>
            <Box mt={5}>
              <Button width={"100%"} colorScheme={"purple"}>
                로그인
              </Button>
            </Box>
          </Box>
        </Box>
      </Center>
    </>
  );
}
