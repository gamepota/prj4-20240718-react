import React from "react";
import { Box } from "@chakra-ui/react";
import KakaoMap2 from "../../KakaoMap2"; // KakaoMap2 컴포넌트 import

const PlaceMap2 = ({ center, level, name }) => {
  return (
    <Box>
      <KakaoMap2 center={center} level={level} name={name} />
    </Box>
  );
};

export default PlaceMap2;
