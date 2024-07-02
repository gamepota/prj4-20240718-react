import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Input } from "@chakra-ui/react";

export const PlaceMap2 = ({ ctprvnCd }) => {
  const [map, setMap] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [address, setAddress] = useState("");
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      initializeMap();
    } else {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=d5b3cb3d230c4f406001bbfad60ef4d4&libraries=services,clusterer,drawing`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          initializeMap();
        }
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
    setMap(map);

    if (ctprvnCd) {
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
      };

      const location = locations[ctprvnCd];
      if (location) {
        map.setCenter(new kakao.maps.LatLng(location.lat, location.lng));
        map.setLevel(6); // 공통 확대 레벨 설정
      }
    }
  };

  const searchPlaces = () => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao maps API is not loaded");
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        let bounds = new window.kakao.maps.LatLngBounds();
        let markersArray = [];

        data.forEach((place) => {
          const position = new window.kakao.maps.LatLng(place.y, place.x);
          const marker = new window.kakao.maps.Marker({
            position,
            map,
          });

          markersArray.push(marker);
          bounds.extend(position);

          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px;z-index:1;">${place.place_name}</div>`,
          });

          window.kakao.maps.event.addListener(marker, "mouseover", () => {
            infowindow.open(map, marker);
          });

          window.kakao.maps.event.addListener(marker, "mouseout", () => {
            infowindow.close();
          });
        });

        setMarkers(markersArray);
        map.setBounds(bounds);
      }
    });
  };

  const searchAddress = () => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao maps API is not loaded");
      return;
    }

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        map.setCenter(coords);
        const marker = new window.kakao.maps.Marker({
          map,
          position: coords,
        });
        const infowindow = new window.kakao.maps.InfoWindow({
          content:
            '<div style="width:150px;text-align:center;padding:6px 0;">여기입니다!</div>',
        });
        infowindow.open(map, marker);
        setMarkers([marker]); // Set only this marker
      }
    });
  };

  const clearMarkers = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };

  useEffect(() => {
    return () => clearMarkers(); // Clean up markers on component unmount
  }, [map]);

  return (
    <Box>
      <Flex direction="column" align="center" mb={4}>
        <Input
          type="text"
          placeholder="장소 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          mb={2}
        />
        <Button onClick={searchPlaces} mb={4}>
          검색
        </Button>
        <Input
          type="text"
          placeholder="주소 검색"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          mb={2}
        />
        <Button onClick={searchAddress}>검색</Button>
      </Flex>
      <Box id="place-map" width="100%" height="500px" />
    </Box>
  );
};
