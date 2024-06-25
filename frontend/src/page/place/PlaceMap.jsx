import React from "react";
import KakaoMap from "../../KakaoMap.jsx";
import geojson from "../../../public/data/json/geojson.json";

export function PlaceMap() {
  return (
    <div className="App">
      <KakaoMap geojson={geojson} />
    </div>
  );
}
