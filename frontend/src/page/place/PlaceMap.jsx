import React from "react";
import KakaoMap from "../../KakaoMap.jsx";
import geojson from "../../../public/data/json/TL_SCCO_CTPRVN";

export function PlaceMap() {
  return (
    <div className="App">
      <KakaoMap geojson={geojson} />
    </div>
  );
}
