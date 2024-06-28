import React, { useEffect, useState } from "react";
import axios from "axios";

const { kakao } = window;

const KakaoMap3 = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      createMap(lat, lng);
      fetchData(lat, lng);
      createMarker(lat, lng, "mini.png");
    });
  }, []);

  const createMap = (lat, lng) => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 6,
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
      <h2>Search Charging Stations</h2>
      <div id="map" style={{ width: "500px", height: "400px" }}></div>
    </div>
  );
};

export default KakaoMap3;
