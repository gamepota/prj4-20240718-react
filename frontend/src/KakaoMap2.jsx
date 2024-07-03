import React, { useEffect, useRef, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

const KakaoMap2 = ({ width = "600px", height = "400px" }) => {
  const kakaoMaps = useRef(null);
  const [map, setMap] = useState(null);

  const getKakao = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const mapContainer = kakaoMaps.current;
        if (!map) {
          const mapOptions = {
            center: new window.kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude,
            ),
            level: 4,
            draggable: false, // 드래그 비활성화
            scrollwheel: false, // 확대/축소 비활성화
          };
          const map = new window.kakao.maps.Map(mapContainer, mapOptions);
          const myPosition = new window.kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude,
          );

          new window.kakao.maps.Marker({
            map: map,
            position: myPosition,
            draggable: false, // 마커 드래그 비활성화
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
    <Flex justify="center" align="center" w="100%" h="100%">
      <Box
        id="map"
        ref={kakaoMaps}
        style={{ width, height, border: "1px solid #ccc" }}
      ></Box>
    </Flex>
  );
};

export default KakaoMap2;
