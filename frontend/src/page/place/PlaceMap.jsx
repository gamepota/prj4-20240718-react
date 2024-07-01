import React, { useState } from "react";
import KakaoMap from "../../KakaoMap.jsx";
import { PlaceMap2 } from "./PlaceMap2.jsx";

export function PlaceMap() {
  const [selectedCtprvnCd, setSelectedCtprvnCd] = useState(null);

  const handlePolygonSelect = (ctprvnCd) => {
    setSelectedCtprvnCd(ctprvnCd);
  };

  return (
    <div className="App">
      <KakaoMap onPolygonSelect={handlePolygonSelect} />
      {selectedCtprvnCd && <PlaceMap2 ctprvnCd={selectedCtprvnCd} />}
    </div>
  );
}
