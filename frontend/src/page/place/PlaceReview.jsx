import React, { useEffect, useState } from "react";
import { Box, FormControl, FormLabel, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function PlaceReview() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);

  useEffect(() => {
    axios.get(`/api/place/${id}`).then((res) => setBoard(res.data));
  }, []);

  if (board === null) {
    return <Spinner />;
  }
  return (
    <Box>
      <Box>
        <FormControl>
          <FormLabel>병원이름</FormLabel>
          {/*<Input value={hospital.id} readOnly />*/}
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>병원사진</FormLabel>
          {/*<Input value={sss} readOnly />*/}
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>병원주소</FormLabel>
          {/*<Input value={hospital.address} readOnly />*/}
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>병원번호</FormLabel>
          {/*<Input value={hospital.callNumber} readOnly />*/}
        </FormControl>
      </Box>
    </Box>
  );
}
