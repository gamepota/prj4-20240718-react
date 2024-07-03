import React, { useState } from "react";
import KakaoMap from "../../KakaoMap.jsx";
import { Box, Button } from "@chakra-ui/react";
import { PlaceMap2 } from "./PlaceMap2.jsx";

export function PlaceMap() {
  const [selectedCtprvnCd, setSelectedCtprvnCd] = useState(null);

  const handlePolygonSelect = (ctprvnCd) => {
    setSelectedCtprvnCd(ctprvnCd);
  };

  const handleBackClick = () => {
    setSelectedCtprvnCd(null);
  };

  return (
    <Box className="App" p={4}>
      <Box
        position="relative"
        width="100%"
        height="500px"
        boxShadow="lg"
        borderRadius="md"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          display={selectedCtprvnCd ? "none" : "block"}
        >
          <KakaoMap onPolygonSelect={handlePolygonSelect} />
        </Box>
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          display={selectedCtprvnCd ? "block" : "none"}
        >
          <PlaceMap2 ctprvnCd={selectedCtprvnCd} />
          <Button
            position="absolute"
            top={4}
            left={4}
            colorScheme="blue"
            onClick={handleBackClick}
            boxShadow="md"
          >
            돌아가기
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
