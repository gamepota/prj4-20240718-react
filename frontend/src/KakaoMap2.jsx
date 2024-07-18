import React, { useEffect, useRef, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

const KakaoMap2 = ({ width = "600px", height = "400px" }) => {
  const kakaoMaps = useRef(null);
  const [map, setMap] = useState(null);

  const loadKakaoMapScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById('kakao-map-script')) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.id = 'kakao-map-script';
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=d5b3cb3d230c4f406001bbfad60ef4d4&autoload=false`;
      script.async = true;
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  };

  const getCurrentLocation = async () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            (error) => {
              console.error("Error getting geolocation: ", error);
              reject(error);
            }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  };

  const initializeMap = async () => {
    try {
      const location = await getCurrentLocation();
      const mapContainer = kakaoMaps.current;
      const mapOptions = {
        center: new window.kakao.maps.LatLng(location.latitude, location.longitude),
        level: 4,
        draggable: false,
        scrollwheel: false,
      };
      const mapInstance = new window.kakao.maps.Map(mapContainer, mapOptions);
      const myPosition = new window.kakao.maps.LatLng(location.latitude, location.longitude);

      new window.kakao.maps.Marker({
        map: mapInstance,
        position: myPosition,
        draggable: false,
      });
      setMap(mapInstance);
    } catch (error) {
      console.log("Unable to determine location.");
    }
  };

  useEffect(() => {
    const loadAndInitializeMap = async () => {
      await loadKakaoMapScript();
      window.kakao.maps.load(() => {
        initializeMap();
      });
    };

    loadAndInitializeMap();
  }, []);

  return (
      <Flex justify="center" align="center" w="100%" h="100%">
        <Box
            id="map"
            ref={kakaoMaps}
            style={{ width, height, border: "1px solid #ccc" }}
        ></Box>
      </Flex>
  );
};

export default KakaoMap2;
