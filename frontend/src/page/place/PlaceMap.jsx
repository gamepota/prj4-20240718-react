import React, { useState } from "react";
import KakaoMap from "../../KakaoMap.jsx";
import { Box } from "@chakra-ui/react";
import { PlaceMap2 } from "./PlaceMap2.jsx";

export function PlaceMap() {
  const [selectedCtprvnCd, setSelectedCtprvnCd] = useState(null);

  const handlePolygonSelect = (ctprvnCd) => {
    setSelectedCtprvnCd(ctprvnCd);
  };

  return (
    <div className="App">
      <Box position="relative" width="100%" height="500px">
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
        </Box>
      </Box>
    </div>
  );
}
