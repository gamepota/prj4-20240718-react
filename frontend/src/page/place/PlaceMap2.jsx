import React, { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import SelectComponent from "../../SelectCompoent.jsx";
// 오타 수정

const { kakao } = window;

export const PlaceMap2 = ({ ctprvnCd }) => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(["HP8"]); // 기본으로 병원 검색

  useEffect(() => {
    const loadKakaoMaps = () => {
      kakao.maps.load(() => {
        initializeMap();
      });
    };

    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY_HERE&autoload=false&libraries=services,clusterer,drawing";
      script.async = true;
      document.head.appendChild(script);
      script.onload = loadKakaoMaps;
    } else {
      loadKakaoMaps();
    }
  }, []); // 카테고리 변경이 아니라 맵 로딩에만 의존

  useEffect(() => {
    if (map) {
      setCenterAndSearch();
    }
  }, [ctprvnCd, selectedCategories, map]); // 카테고리와 지역 코드에 따라 의존

  const initializeMap = () => {
    const mapContainer = document.getElementById("place-map");
    const mapOption = {
      center: new kakao.maps.LatLng(36.2, 128.02025),
      level: 13,
    };
    const newMap = new kakao.maps.Map(mapContainer, mapOption);
    setMap(newMap);
  };

  const setCenterAndSearch = () => {
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
        // 나머지 지역 코드도 같은 형식으로 추가
      };

      const location = locations[ctprvnCd];
      if (location) {
        map.setCenter(new kakao.maps.LatLng(location.lat, location.lng));
        map.setLevel(6);
      }
    }
    searchByCategory(); // 카테고리에 따른 검색 실행
  };

  const searchByCategory = () => {
    if (!map || !kakao || !kakao.maps || !kakao.maps.services) {
      console.error("Map services are not ready.");
      return;
    }

    markers.forEach((marker) => marker.setMap(null)); // 기존 마커 제거
    setMarkers([]);

    const ps = new kakao.maps.services.Places();

    selectedCategories.forEach((category) => {
      ps.categorySearch(
        category,
        (data, status) => {
          if (status === kakao.maps.services.Status.OK) {
            processSearchResults(data);
          } else {
            console.error("Places search failed:", status);
          }
        },
        { useMapBounds: true },
      );
    });
  };

  const processSearchResults = (data) => {
    const bounds = new kakao.maps.LatLngBounds();
    const newMarkers = data.map((place) => {
      const marker = new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
      kakao.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>",
        );
        infowindow.open(map, marker);
      });

      bounds.extend(new kakao.maps.LatLng(place.y, place.x));
      return marker;
    });

    map.setBounds(bounds);
    setMarkers((prevMarkers) => [...prevMarkers, ...newMarkers]);
  };

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };

  return (
    <Box position="relative" width="100%" height="500px">
      <Box
        position="absolute"
        top="10px"
        left="10px"
        zIndex="10"
        background="white"
        p={4}
        boxShadow="md"
      >
        <SelectComponent
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
        />
        <Button mt={2} onClick={searchByCategory}>
          Search by Category
        </Button>
      </Box>
      <Box id="place-map" width="100%" height="100%" />
    </Box>
  );
};
