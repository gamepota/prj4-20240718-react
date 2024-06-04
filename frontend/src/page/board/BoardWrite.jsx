import { Box, FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";

export function BoardWrite() {
  return (
    <Box>
      <FormControl>
        <FormLabel>제목</FormLabel>
        <Input></Input>
      </FormControl>
      <FormControl>
        <FormLabel>내용</FormLabel>
        <Textarea></Textarea>
      </FormControl>
    </Box>
  );
}
