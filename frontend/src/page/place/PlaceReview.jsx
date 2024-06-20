import React, { useEffect, useState } from "react";
import { Box, FormControl, FormLabel, Input, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CommentComponent } from "../../component/place/CommentComponent.jsx";

export function PlaceReview() {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);

  useEffect(() => {
    axios.get(`/api/place/map/${id}`).then((res) => setHospital(res.data));
  }, []);

  if (hospital === null) {
    return <Spinner />;
  }
  return (
    <Box>
      <Box>
        <FormControl>
          <FormLabel>병원사진</FormLabel>
          {/*<Input value={sss} readOnly />*/}
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>병원이름</FormLabel>
          <Input value={hospital.name} readOnly />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>병원주소</FormLabel>
          <Input value={hospital.address} readOnly />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>병원번호</FormLabel>
          <Input value={hospital.callNumber} readOnly />
        </FormControl>
      </Box>
      <Box>
        <CommentComponent hospitalId={hospital.id} />
      </Box>
    </Box>
  );
}
