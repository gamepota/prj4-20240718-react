import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import axios from "axios";

const KakaoMap = () => {
  const [geojson, setGeojson] = useState(null);

  const calculateCenter = (coordinates) => {
    let latSum = 0;
    let lngSum = 0;
    let numPoints = 0;

    coordinates.forEach((polygonCoordinates) => {
      polygonCoordinates.forEach((coordinate) => {
        lngSum += coordinate[0];
        latSum += coordinate[1];
        numPoints++;
      });
    });

    return [lngSum / numPoints, latSum / numPoints];
  };

  useEffect(() => {
    const fetchGeojson = async () => {
      try {
        const response = await axios.get("/api/boundarySet"); // Spring Boot API 호출
        console.log("GeoJSON data:", response.data); // 데이터 확인용 로그
        setGeojson(response.data);
      } catch (error) {
        console.error("Error fetching geojson:", error);
      }
    };

    fetchGeojson();
  }, []);

  useEffect(() => {
    if (!geojson) return;

    // Check if Kakao Maps API is already loaded
    if (window.kakao && window.kakao.maps) {
      initializeMap();
    } else {
      // Load the Kakao Maps API script dynamically
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=d5b3cb3d230c4f406001bbfad60ef4d4&libraries=services,clusterer,drawing`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        initializeMap();
      };
    }
  }, [geojson]);

  const initializeMap = () => {
    const kakao = window.kakao;
    const data = geojson.features; // 이미 파싱된 객체 사용
    const polygons = [];

    const mapContainer = document.getElementById("pollution-map");
    const mapOption = {
      center: new kakao.maps.LatLng(36.2, 128.02025),
      level: 13,
      draggable: true, // 드래그를 기본적으로 활성화
      scrollwheel: false, // 확대/축소 비활성화
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    const customOverlay = new kakao.maps.CustomOverlay({});
    const infowindow = new kakao.maps.InfoWindow({ removable: true });

    const minLat = 35;
    const maxLat = 36.4;
    const fixedLng = 128.02025; // 고정된 경도 값

    // 지도 이동 이벤트 리스너 등록
    kakao.maps.event.addListener(map, "center_changed", () => {
      const center = map.getCenter();
      const lat = center.getLat();
      const lng = center.getLng();

      // 위도 범위를 벗어나면 제한된 범위 내로 다시 설정
      if (lat < minLat) {
        map.setCenter(new kakao.maps.LatLng(minLat, fixedLng));
      } else if (lat > maxLat) {
        map.setCenter(new kakao.maps.LatLng(maxLat, fixedLng));
      } else {
        // 위도 범위 내에 있으면 경도는 고정
        map.setCenter(new kakao.maps.LatLng(lat, fixedLng));
      }
    });

    const displayArea = (coordinates, name) => {
      const path = [];
      const center = calculateCenter(coordinates);

      coordinates.forEach((polygonCoordinates) => {
        const polygonPath = [];
        polygonCoordinates.forEach((coordinate) => {
          polygonPath.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
        });

        const polygon = new kakao.maps.Polygon({
          map: map,
          path: polygonPath,
          strokeWeight: 2,
          strokeColor: "#004c80",
          strokeOpacity: 0.8,
          strokeStyle: "solid",
          fillColor: "#fff",
          fillOpacity: 0.7,
        });

        polygons.push(polygon);

        kakao.maps.event.addListener(
          polygon,
          "mouseover",
          function (mouseEvent) {
            polygon.setOptions({ fillColor: "#09f" });
            customOverlay.setContent('<div class="area">' + name + "</div>");
            customOverlay.setPosition(mouseEvent.latLng);
            customOverlay.setMap(map);
          },
        );

        kakao.maps.event.addListener(
          polygon,
          "mousemove",
          function (mouseEvent) {
            customOverlay.setPosition(mouseEvent.latLng);
          },
        );

        kakao.maps.event.addListener(polygon, "mouseout", function () {
          polygon.setOptions({ fillColor: "#fff" });
          customOverlay.setMap(null);
        });

        kakao.maps.event.addListener(polygon, "click", function (mouseEvent) {
          const content = `<div style="padding:2px;"><p><b>${name}</b></p></div>`;
          infowindow.setContent(content);
          infowindow.setPosition(mouseEvent.latLng);
          infowindow.setMap(map);

          // 지도 중심 좌표를 클릭한 폴리곤의 중심으로 이동하고 확대
          map.setCenter(new kakao.maps.LatLng(center[1], center[0]));
          map.setLevel(8); // 원하는 확대 수준으로 설정
        });
      });
    };

    data.forEach((val) => {
      const coordinates = val.geometry.coordinates;
      const name = val.properties.CTP_KOR_NM; // 속성 이름 수정

      console.log("Coordinates for:", name, coordinates);

      displayArea(coordinates, name);
    });
  };

  return (
    <Box
      id="pollution-map"
      style={{
        width: "100%",
        height: "500px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    ></Box>
  );
};

export default KakaoMap;
