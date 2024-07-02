import React, { useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
import SearchBox from "../../SearchBox.jsx";

const { kakao } = window;

export const PlaceMap2 = ({ ctprvnCd }) => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);
  const boundsRef = useRef(null);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      initializeMap();
    } else {
      const script = document.createElement("script");
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=d5b3cb3d230c4f406001bbfad60ef4d4&libraries=services,clusterer,drawing";
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        initializeMap();
      };
    }
  }, [ctprvnCd]);

  const initializeMap = () => {
    const kakao = window.kakao;

    const mapContainer = mapRef.current;
    const mapOption = {
      center: new kakao.maps.LatLng(36.2, 128.02025),
      level: 6, // 기본 확대 레벨 설정
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    setMap(map);

    if (ctprvnCd) {
      // 특정 지역의 범위를 설정합니다.
      const bounds = getBoundsForRegion(ctprvnCd);
      if (bounds) {
        map.setBounds(bounds);
        boundsRef.current = bounds;

        // 지도 이동이 끝났을 때 이벤트
        kakao.maps.event.addListener(map, "dragend", checkBounds);
        // 확대 또는 축소 시 이벤트
        kakao.maps.event.addListener(map, "zoom_changed", checkBounds);

        const polygonPath = getPathForRegion(ctprvnCd);
        const polygon = new kakao.maps.Polygon({
          map: map,
          path: polygonPath,
          strokeWeight: 3,
          strokeColor: "#39f",
          strokeOpacity: 0.8,
          fillColor: "#39f",
          fillOpacity: 0.7,
        });

        kakao.maps.event.addListener(polygon, "click", () => {
          searchPlaces("동물병원", bounds); // '동물병원'을 검색
        });
      }
    }
  };

  const getBoundsForRegion = (ctprvnCd) => {
    const kakao = window.kakao;

    const regions = {
      11: [
        // 서울특별시
        new kakao.maps.LatLng(37.701, 127.183),
        new kakao.maps.LatLng(37.47, 126.835),
      ],
      26: [
        // 부산광역시
        new kakao.maps.LatLng(35.321, 129.248),
        new kakao.maps.LatLng(35.085, 128.899),
      ],
      27: [
        // 대구광역시
        new kakao.maps.LatLng(35.954, 128.668),
        new kakao.maps.LatLng(35.817, 128.523),
      ],
      28: [
        // 인천광역시
        new kakao.maps.LatLng(37.595, 126.8),
        new kakao.maps.LatLng(37.366, 126.56),
      ],
      29: [
        // 광주광역시
        new kakao.maps.LatLng(35.22, 126.955),
        new kakao.maps.LatLng(35.05, 126.8),
      ],
      30: [
        // 대전광역시
        new kakao.maps.LatLng(36.437, 127.499),
        new kakao.maps.LatLng(36.267, 127.297),
      ],
      31: [
        // 울산광역시
        new kakao.maps.LatLng(35.6, 129.44),
        new kakao.maps.LatLng(35.4, 129.21),
      ],
      36: [
        // 세종특별자치시
        new kakao.maps.LatLng(36.601, 127.356),
        new kakao.maps.LatLng(36.466, 127.223),
      ],
      41: [
        // 경기도
        new kakao.maps.LatLng(38.274, 127.537),
        new kakao.maps.LatLng(36.756, 126.574),
      ],
      42: [
        // 강원도
        new kakao.maps.LatLng(38.52, 129.272),
        new kakao.maps.LatLng(37.018, 127.589),
      ],
      43: [
        // 충청북도
        new kakao.maps.LatLng(37.103, 128.212),
        new kakao.maps.LatLng(36.128, 127.318),
      ],
      44: [
        // 충청남도
        new kakao.maps.LatLng(36.914, 127.496),
        new kakao.maps.LatLng(36.013, 126.377),
      ],
      45: [
        // 전라북도
        new kakao.maps.LatLng(36.097, 127.391),
        new kakao.maps.LatLng(35.291, 126.533),
      ],
      46: [
        // 전라남도
        new kakao.maps.LatLng(35.321, 127.371),
        new kakao.maps.LatLng(34.055, 126.074),
      ],
      47: [
        // 경상북도
        new kakao.maps.LatLng(37.586, 129.261),
        new kakao.maps.LatLng(35.635, 127.664),
      ],
      48: [
        // 경상남도
        new kakao.maps.LatLng(35.806, 128.966),
        new kakao.maps.LatLng(34.583, 127.418),
      ],
      50: [
        // 제주특별자치도
        new kakao.maps.LatLng(33.556, 126.98),
        new kakao.maps.LatLng(33.12, 126.162),
      ],
    };

    if (regions[ctprvnCd]) {
      const [sw, ne] = regions[ctprvnCd];
      return new kakao.maps.LatLngBounds(sw, ne);
    }
    return null;
  };

  const getPathForRegion = (ctprvnCd) => {
    const kakao = window.kakao;

    const regionPaths = {
      11: [
        // 서울특별시 예시 경로 (실제 경로는 다를 수 있습니다)
        new kakao.maps.LatLng(37.64, 126.9),
        new kakao.maps.LatLng(37.67, 127.05),
        new kakao.maps.LatLng(37.7, 127.02),
        new kakao.maps.LatLng(37.65, 126.9),
      ],
      26: [
        // 부산광역시 예시 경로 (실제 경로는 다를 수 있습니다)
        new kakao.maps.LatLng(35.1, 128.9),
        new kakao.maps.LatLng(35.2, 129.1),
        new kakao.maps.LatLng(35.3, 128.95),
        new kakao.maps.LatLng(35.15, 128.85),
      ],
      // 다른 지역들도 동일하게 설정합니다.
    };

    return regionPaths[ctprvnCd] || [];
  };

  const checkBounds = () => {
    const kakao = window.kakao;
    const bounds = boundsRef.current;
    if (!bounds) return;

    const center = map.getCenter();

    if (!bounds.contain(center)) {
      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();

      let x = center.getLng();
      let y = center.getLat();

      if (x < sw.getLng()) x = sw.getLng();
      if (x > ne.getLng()) x = ne.getLng();
      if (y < sw.getLat()) y = sw.getLat();
      if (y > ne.getLat()) y = ne.getLat();

      map.setCenter(new kakao.maps.LatLng(y, x));
    }

    // 줌 레벨 제한
    if (map.getLevel() < 6) {
      map.setLevel(6);
    }
  };

  const searchPlaces = (keyword, bounds) => {
    const kakao = window.kakao;
    const ps = new kakao.maps.services.Places();

    const searchOption = {
      bounds: bounds,
    };

    if (!keyword.replace(/^\s+|\s+$/g, "")) {
      alert("키워드를 입력해주세요!");
      return false;
    }

    ps.keywordSearch(
      keyword,
      (data, status) => placesSearchCB(data, status, bounds),
      searchOption,
    );
  };

  const placesSearchCB = (data, status, bounds) => {
    const kakao = window.kakao;
    if (status === kakao.maps.services.Status.OK) {
      displayPlaces(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
    }
  };

  const displayPlaces = (places) => {
    const kakao = window.kakao;

    // 기존 마커 제거
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);

    const newMarkers = places.map((place, index) => {
      const position = new kakao.maps.LatLng(place.y, place.x);
      const marker = addMarker(position, index);

      // 마커와 검색 결과 항목에 이벤트 등록
      kakao.maps.event.addListener(marker, "mouseover", () => {
        displayInfowindow(marker, place.place_name);
      });

      kakao.maps.event.addListener(marker, "mouseout", () => {
        infowindow.close();
      });

      return marker;
    });

    setMarkers(newMarkers);
  };

  const addMarker = (position, idx) => {
    const kakao = window.kakao;
    const imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
    const imageSize = new kakao.maps.Size(36, 37);
    const imgOptions = {
      spriteSize: new kakao.maps.Size(36, 691),
      spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10),
      offset: new kakao.maps.Point(13, 37),
    };
    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imgOptions,
    );
    const marker = new kakao.maps.Marker({
      position,
      image: markerImage,
    });

    marker.setMap(map);
    return marker;
  };

  const displayInfowindow = (marker, title) => {
    const content = `<div style="padding:5px;z-index:1;">${title}</div>`;
    infowindow.setContent(content);
    infowindow.open(map, marker);
  };

  const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

  return (
    <Box position="relative" width="100%" height="500px">
      <Box position="absolute" top="10px" left="10px" zIndex="10">
        <SearchBox onSearch={searchPlaces} />
      </Box>
      <Box id="place-map" ref={mapRef} width="100%" height="100%" />
    </Box>
  );
};
