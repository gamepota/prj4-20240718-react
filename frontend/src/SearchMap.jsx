import React, { useEffect, useRef, useState } from "react";
import { Box, List, ListItem } from "@chakra-ui/react";
import SearchBox from "./SearchBox";

const SearchMap = () => {
  const [places, setPlaces] = useState([]);
  const [pagination, setPagination] = useState(null);
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const infowindow = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=d5b3cb3d230c4f406001bbfad60ef4d4&libraries=services,clusterer,drawing`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const kakao = window.kakao;
      const container = mapRef.current;
      const options = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3,
      };

      const map = new kakao.maps.Map(container, options);
      setMap(map);
      infowindow.current = new kakao.maps.InfoWindow({ zIndex: 1 });
    };
  }, []);

  const searchPlaces = (keyword) => {
    const kakao = window.kakao;
    const ps = new kakao.maps.services.Places();

    if (!keyword.replace(/^\s+|\s+$/g, "")) {
      alert("키워드를 입력해주세요!");
      return false;
    }

    ps.keywordSearch(keyword, placesSearchCB);
  };

  const placesSearchCB = (data, status, pagination) => {
    const kakao = window.kakao;
    if (status === kakao.maps.services.Status.OK) {
      setPlaces(data);
      setPagination(pagination);
      displayPlaces(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
      setPlaces([]);
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
      setPlaces([]);
    }
  };

  const displayPlaces = (places) => {
    const kakao = window.kakao;
    const bounds = new kakao.maps.LatLngBounds();

    // 기존 마커 제거
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);

    const newMarkers = places.map((place, index) => {
      const position = new kakao.maps.LatLng(place.y, place.x);
      const marker = addMarker(position, index);
      bounds.extend(position);

      // 마커와 검색 결과 항목에 이벤트 등록
      kakao.maps.event.addListener(marker, "mouseover", () => {
        displayInfowindow(marker, place.place_name);
      });

      kakao.maps.event.addListener(marker, "mouseout", () => {
        infowindow.current.close();
      });

      return marker;
    });

    setMarkers(newMarkers);
    map.setBounds(bounds);
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
    infowindow.current.setContent(content);
    infowindow.current.open(map, marker);
  };

  return (
    <Box>
      <SearchBox onSearch={searchPlaces} />
      <Box id="map" ref={mapRef} width="100%" height="500px" />
      <Box id="menu_wrap">
        <List id="placesList">
          {places.map((place, index) => (
            <ListItem key={index} className="item">
              <span className={`markerbg marker_${index + 1}`}></span>
              <div className="info">
                <h5>{place.place_name}</h5>
                {place.road_address_name ? (
                  <>
                    <span>{place.road_address_name}</span>
                    <span className="jibun gray">{place.address_name}</span>
                  </>
                ) : (
                  <span>{place.address_name}</span>
                )}
                <span className="tel">{place.phone}</span>
              </div>
            </ListItem>
          ))}
        </List>
        <Box id="pagination">
          {pagination &&
            Array.from({ length: pagination.last }, (_, i) => (
              <a
                key={i + 1}
                href="#"
                onClick={() => pagination.gotoPage(i + 1)}
                className={pagination.current === i + 1 ? "on" : ""}
              >
                {i + 1}
              </a>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SearchMap;
