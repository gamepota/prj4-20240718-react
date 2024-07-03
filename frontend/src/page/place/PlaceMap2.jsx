import React, { useEffect, useState } from "react";
import { Box, Button, Spacer } from "@chakra-ui/react";
import SelectComponent from "../../SelectCompoent.jsx";
import { useNavigate } from "react-router-dom";

export const PlaceMap2 = ({ ctprvnCd }) => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(["HP8"]); // 기본으로 병원 검색
  const navigate = useNavigate();
  useEffect(() => {
    const initializeMap = () => {
      const { kakao } = window;
      const mapContainer = document.getElementById("place-map");
      const mapOption = {
        center: new kakao.maps.LatLng(36.2, 128.02025),
        level: 13,
      };

      const map = new kakao.maps.Map(mapContainer, mapOption);
      setMap(map);

      if (ctprvnCd) {
        const locations = {
          11: { lat: 37.5665, lng: 126.978 },
          26: { lat: 35.1796, lng: 129.0756 },
          27: { lat: 35.8714, lng: 128.6014 },
          28: { lat: 37.4563, lng: 126.7052 },
          29: { lat: 35.1595, lng: 126.8526 },
          30: { lat: 36.3504, lng: 127.3845 },
          31: { lat: 35.539, lng: 129.3114 },
          36: { lat: 36.4801, lng: 127.289 },
          41: { lat: 37.4138, lng: 127.5183 },
          42: { lat: 37.8228, lng: 128.1555 },
          43: { lat: 36.635, lng: 127.4914 },
          44: { lat: 36.5184, lng: 126.8007 },
          45: { lat: 35.7175, lng: 127.153 },
          46: { lat: 34.816, lng: 126.4629 },
          47: { lat: 36.4919, lng: 128.8889 },
          48: { lat: 35.4606, lng: 128.2132 },
          50: { lat: 33.4996, lng: 126.5312 },
        };

        const location = locations[ctprvnCd];
        if (location) {
          map.setCenter(new kakao.maps.LatLng(location.lat, location.lng));
          map.setLevel(6);
        }
      }

      searchByCategory(map); // 기본 카테고리로 검색
    };

    const loadKakaoMapScript = () => {
      const script = document.createElement("script");
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=d5b3cb3d230c4f406001bbfad60ef4d4&libraries=services,clusterer,drawing";
      script.async = true;
      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(() => {
            initializeMap();
          });
        }
      };
      document.head.appendChild(script);
    };

    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        initializeMap();
      });
    } else {
      loadKakaoMapScript();
    }
  }, [ctprvnCd]);

  const searchByCategory = (map) => {
    if (
      !map ||
      !window.kakao ||
      !window.kakao.maps ||
      !window.kakao.maps.services
    )
      return;

    const ps = new kakao.maps.services.Places();
    const bounds = new kakao.maps.LatLngBounds();

    selectedCategories.forEach((category) => {
      ps.categorySearch(
        category,
        (data, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const newMarkers = data.map((place) => {
              const markerPosition = new kakao.maps.LatLng(place.y, place.x);
              const marker = new kakao.maps.Marker({
                position: markerPosition,
              });

              marker.setMap(map);

              const infowindow = new kakao.maps.InfoWindow({
                content: `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`,
              });

              kakao.maps.event.addListener(marker, "click", () => {
                infowindow.open(map, marker);
              });

              bounds.extend(markerPosition);
              return marker;
            });

            map.setBounds(bounds);
            setMarkers((prevMarkers) => [...prevMarkers, ...newMarkers]);
          }
        },
        { useMapBounds: true },
      );
    });
  };

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };

  function GotoHospitalHandler() {
    navigate("/place/1");
  }

  return (
    <Box position="relative" width="100%" height="500px">
      <Box
        position="absolute"
        top="50%" // 상단에서 50%의 위치에 놓임 (중앙에 가깝게)
        left="0" // 왼쪽 가장자리에 위치
        transform="translateY(-50%)" // Y축 기준 중앙 정렬
        zIndex="10"
        background="rgba(255, 255, 255, 0.8)" // 반투명 흰색 배경
        p={4}
        boxShadow="md"
        width="200px" // 박스의 너비 설정
        height="400px"
      >
        <SelectComponent
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
        />
        <Button mt={2} onClick={() => searchByCategory(map)}>
          카테고리 검색
        </Button>
        <Spacer />
        <Button onClick={GotoHospitalHandler}>추천 병원 바로 가기</Button>
      </Box>
      <Box id="place-map" width="100%" height="100%" />
    </Box>
  );
};
