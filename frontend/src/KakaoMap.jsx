import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";

const KakaoMap = ({ geojson }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=d5b3cb3d230c4f406001bbfad60ef4d4&libraries=services,clusterer,drawing";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const kakao = window.kakao;
      let data = geojson.features;

      const mapContainer = document.getElementById("pollution-map"); // 지도를 표시할 div
      const mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 9, // 지도의 확대 레벨
      };

      const map = new kakao.maps.Map(mapContainer, mapOption);
      const customOverlay = new kakao.maps.CustomOverlay({});
      const infowindow = new kakao.maps.InfoWindow({ removable: true });

      const displayArea = (coordinates, name) => {
        let path = [];
        let points = [];
        let areaResult = pollution.find((item) => item[0] === name);

        coordinates[0].forEach((coordinate) => {
          path.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
        });

        let polygon = new kakao.maps.Polygon({
          map: map,
          path: path, // 그려질 다각형의 좌표 배열입니다
          strokeWeight: 2, // 선의 두께입니다
          strokeColor: "#004c80", // 선의 색깔입니다
          strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle: "solid", // 선의 스타일입니다
          fillColor: "#fff", // 채우기 색깔입니다
          fillOpacity: 0.7, // 채우기 불투명도 입니다
        });

        polygons.push(polygon);

        // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다
        // 지역명을 표시하는 커스텀오버레이를 지도위에 표시합니다
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

        // 다각형에 mousemove 이벤트를 등록하고 이벤트가 발생하면 커스텀 오버레이의 위치를 변경합니다
        kakao.maps.event.addListener(
          polygon,
          "mousemove",
          function (mouseEvent) {
            customOverlay.setPosition(mouseEvent.latLng);
          },
        );

        // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
        // 커스텀 오버레이를 지도에서 제거합니다
        kakao.maps.event.addListener(polygon, "mouseout", function () {
          polygon.setOptions({ fillColor: "#fff" });
          customOverlay.setMap(null);
        });

        // 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 다각형의 이름과 면적을 인포윈도우에 표시합니다
        kakao.maps.event.addListener(polygon, "click", function (mouseEvent) {
          const content =
            '<div style="padding:2px;"><p><b>' +
            name +
            "</b></p><p>이산화질소농도: " +
            areaResult[1] +
            "</p><p>오존농도: " +
            areaResult[2] +
            "</p><p>일산화탄소농도: " +
            areaResult[3] +
            "</p><p>아황산가스: " +
            areaResult[4] +
            "</p><p>미세먼지: " +
            areaResult[5] +
            "</p><p>초미세먼지: " +
            areaResult[6] +
            "</div>";

          infowindow.setContent(content);
          infowindow.setPosition(mouseEvent.latLng);
          infowindow.setMap(map);
        });
      };

      data.forEach((val) => {
        let coordinates = val.geometry.coordinates;
        let name = val.properties.SIG_KOR_NM;

        displayArea(coordinates, name);
      });
    };
  }, [geojson, pollution]);

  return (
    <Box id="pollution-map" style={{ width: "100%", height: "500px" }}></Box>
  );
};

export default KakaoMap;
