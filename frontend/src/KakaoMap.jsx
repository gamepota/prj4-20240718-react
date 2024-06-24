// src/components/KakaoMap.jsx

import React, { useEffect, useRef, useState } from "react";

const KakaoMap = () => {
  const kakaoMaps = useRef(null);
  const [map, setMap] = useState(null);

  const getKakao = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const mapContainer = document.getElementById("map");
        if (!map) {
          const mapOptions = {
            center: new window.kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude,
            ),
            level: 4,
          };
          const map = new window.kakao.maps.Map(mapContainer, mapOptions);
          const myPosition = new window.kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude,
          );

          const marker = new window.kakao.maps.Marker({
            map: map,
            position: myPosition,
          });
          setMap(map);
        }
      });
    } else {
      console.log("내 위치를 사용할 수 없어요.");
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
