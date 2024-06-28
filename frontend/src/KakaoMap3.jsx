import React, { useEffect, useState } from "react";
import axios from "axios";

const { kakao } = window;

const KakaoMap3 = ({ placeId }) => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const coordinatesMap = {
      0: { center: [126.978, 37.5665], level: 6 }, // 서울
      1: { center: [127.25, 37.5], level: 7 }, // 경기도
      // 다른 지역도 추가
    };

    if (placeId === null) return;

    const { center, level } = coordinatesMap[placeId];

    createMap(center[1], center[0], level);
    fetchData(center[1], center[0]);
  }, [placeId]);

  const createMap = (lat, lng, level) => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: level,
    };
    const mapInstance = new kakao.maps.Map(container, options);
    setMap(mapInstance);
  };

  const fetchData = async (lat, lng) => {
    try {
      const response = await axios.get("/tetest/data");
      const data = response.data;
      data.forEach((v) => {
        const stationLat = v.latitude;
        const stationLng = v.longitude;
        const distanceInKm = getDistanceFromLatLonInKm(
          lat,
          lng,
          stationLat,
          stationLng,
        );
        if (distanceInKm <= 2) {
          createMarker(
            stationLat,
            stationLng,
            "https://cdn-icons-png.flaticon.com/512/7512/7512521.png",
          );
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const createMarker = (lat, lng, imageSrc) => {
    const markerPosition = new kakao.maps.LatLng(lat, lng);
    const imageSize = new kakao.maps.Size(50, 52);
    const imageOption = { offset: new kakao.maps.Point(27, 69) };
    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption,
    );
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });
    marker.setMap(map);
    setMarkers((prevMarkers) => [...prevMarkers, marker]);
  };

  return (
    <div className="container mt-5">
      <h2>Map3</h2>
      <div id="map" style={{ width: "500px", height: "400px" }}></div>
    </div>
  );
};

export default KakaoMap3;
