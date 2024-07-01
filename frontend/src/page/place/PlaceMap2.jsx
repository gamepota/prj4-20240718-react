import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";

export const PlaceMap2 = ({ ctprvnCd }) => {
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      initializeMap();
    } else {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=d5b3cb3d230c4f406001bbfad60ef4d4&libraries=services,clusterer,drawing`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        initializeMap();
      };
    }
  }, [ctprvnCd]);

  const initializeMap = () => {
    const kakao = window.kakao;

    const mapContainer = document.getElementById("place-map");
    const mapOption = {
      center: new kakao.maps.LatLng(36.2, 128.02025),
      level: 13,
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);

    if (ctprvnCd) {
      // Center the map based on the ctprvnCd
      const locations = {
        11: { lat: 37.3365, lng: 126.5919 }, // 서울특별시
        26: { lat: 35.104, lng: 129.0217 }, // 부산광역시
        27: { lat: 35.03, lng: 126.38 }, // 대구광역시
        28: { lat: 37.583944, lng: 126.37855 }, // 인천광역시
        29: { lat: 35.1557, lng: 126.83543 }, // 광주광역시
        30: { lat: 36.3397, lng: 127.394 }, // 대전광역시
        31: { lat: 35.5541, lng: 129.2376 }, // 울산광역시
        36: { lat: 36.55606, lng: 129.2376 }, // 세종특별자치시
        41: { lat: 37.533, lng: 127.1808 }, // 경기도
        42: { lat: 37.7182, lng: 128.3034 }, //강원도
        43: { lat: 36.7378, lng: 127.8304 }, // 충청북도
        44: { lat: 36.5285, lng: 126.8503 }, // 충청남도
        45: { lat: 35.7157, lng: 127.1424 }, //전라북도
        46: { lat: 34.8757, lng: 126.9003 }, //전라남도
        47: { lat: 36.3475, lng: 128.7484 }, //경상북도
        48: { lat: 35.3242, lng: 128.2615 }, //경상남도
        50: { lat: 33.387, lng: 126.5536 }, //제주

        // Add other regions as necessary
      };

      const location = locations[ctprvnCd];
      if (location) {
        map.setCenter(new kakao.maps.LatLng(location.lat, location.lng));
      }
    }
  };

  return <Box id="place-map" width="100%" height="500px" />;
};
