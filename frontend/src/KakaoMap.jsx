import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import PlaceMap2 from "./page/place/PlaceMap2.jsx"; // KakaoMap3를 import합니다.

const KakaoMap = () => {
  const [geojson, setGeojson] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [placeId, setPlaceId] = useState(null); // 고유번호 저장
  const [center, setCenter] = useState([128.02025, 36.2]);
  const [level, setLevel] = useState(13);
  const [polygonName, setPolygonName] = useState("");

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
  }, [geojson]);

  const initializeMap = () => {
    const kakao = window.kakao;
    const data = geojson.features;
    const polygons = [];

    const mapContainer = document.getElementById("pollution-map");
    const mapOption = {
      center: new kakao.maps.LatLng(36.2, 128.02025),
      level: 13,
      draggable: true,
      scrollwheel: false,
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    const customOverlay = new kakao.maps.CustomOverlay({});
    const infowindow = new kakao.maps.InfoWindow({ removable: true });

    const minLat = 35;
    const maxLat = 36.4;
    const fixedLng = 128.02025;

    kakao.maps.event.addListener(map, "center_changed", () => {
      const center = map.getCenter();
      const lat = center.getLat();
      const lng = center.getLng();

      if (lat < minLat) {
        map.setCenter(new kakao.maps.LatLng(minLat, fixedLng));
      } else if (lat > maxLat) {
        map.setCenter(new kakao.maps.LatLng(maxLat, fixedLng));
      } else {
        map.setCenter(new kakao.maps.LatLng(lat, fixedLng));
      }
    });

    const regionMap = {
      "Array(200)": 0, // 서울
      "Array(400)": 1, // 경기도
      // 다른 지역도 추가
    };

    const displayArea = (coordinates, name, index) => {
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

          const id = regionMap[`Array(${coordinates.length})`]; // 고유번호 설정
          setPlaceId(id); // 고유번호 저장

          setCenter([center[0], center[1]]);
          setLevel(8);
          setPolygonName(name);
          setSelectedPlace(name);
        });
      });
    };

    data.forEach((val, index) => {
      const coordinates = val.geometry.coordinates;
      const name = val.properties.CTP_KOR_NM;

      console.log("Coordinates for:", name, coordinates);

      displayArea(coordinates, name, index);
    });
  };

  return (
    <Box>
      <Box
        id="pollution-map"
        style={{
          width: "100%",
          height: "500px",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
      ></Box>
      {selectedPlace && <PlaceMap2 placeId={placeId} />}
    </Box>
  );
};

export default KakaoMap;
