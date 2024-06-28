import React from "react";
import { Box } from "@chakra-ui/react";
import KakaoMap3 from "../../KakaoMap3"; // KakaoMap3 컴포넌트 import

const PlaceMap2 = ({ placeId }) => {
  return (
    <Box>
      <KakaoMap3 placeId={placeId} />
    </Box>
  );
};

export default PlaceMap2;
