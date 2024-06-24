// src/components/KakaoMap.jsx

import React, { useEffect, useRef, useState } from "react";

const KakaoMap = () => {
  const kakaoMaps = useRef(null);
  const [map, setMap] = useState(null);

  const getKakao = () => {
    const mapContainer = document.getElementById("map");
    if (!map) {
      const mapOptions = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 4,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOptions);
      setMap(map);
    }
  };
  useEffect(() => {
    getKakao();
  }, []);
  return (
    <div
      id="map"
      ref={kakaoMaps}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
};

export default KakaoMap;
