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
      level: 13, // 기본 확대 레벨 설정
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);

    if (ctprvnCd) {
      // Center the map based on the ctprvnCd
      const locations = {
        11: { lat: 37.5665, lng: 126.978 }, // 서울특별시
        26: { lat: 35.1796, lng: 129.0756 }, // 부산광역시
        27: { lat: 35.8714, lng: 128.6014 }, // 대구광역시
        28: { lat: 37.4563, lng: 126.7052 }, // 인천광역시
        29: { lat: 35.1595, lng: 126.8526 }, // 광주광역시
        30: { lat: 36.3504, lng: 127.3845 }, // 대전광역시
        31: { lat: 35.539, lng: 129.3114 }, // 울산광역시
        36: { lat: 36.4801, lng: 127.289 }, // 세종특별자치시
        41: { lat: 37.4138, lng: 127.5183 }, // 경기도
        42: { lat: 37.8228, lng: 128.1555 }, // 강원도
        43: { lat: 36.635, lng: 127.4914 }, // 충청북도
        44: { lat: 36.5184, lng: 126.8007 }, // 충청남도
        45: { lat: 35.7175, lng: 127.153 }, // 전라북도
        46: { lat: 34.816, lng: 126.4629 }, // 전라남도
        47: { lat: 36.4919, lng: 128.8889 }, // 경상북도
        48: { lat: 35.4606, lng: 128.2132 }, // 경상남도
        50: { lat: 33.4996, lng: 126.5312 }, // 제주특별자치도
        // Add other regions as necessary
      };

      const location = locations[ctprvnCd];
      if (location) {
        map.setCenter(new kakao.maps.LatLng(location.lat, location.lng));
        map.setLevel(6); // 공통 확대 레벨 설정
      }
    }
  };

  return <Box id="place-map" width="100%" height="500px" />;
};
