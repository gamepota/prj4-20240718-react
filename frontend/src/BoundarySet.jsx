import React, { useEffect, useState } from "react";
import axios from "axios";
import * as turf from "@turf/turf";

const BoundarySet = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("./geojson.json");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!data) return;

    data.features.forEach((feature, i) => {
      console.log(feature.properties.CTP_KOR_NM, " 정보 표시됨");

      const polys = feature.geometry.coordinates.map((coordinate) =>
        turf.polygon([coordinate]),
      );

      const poly = turf.multiPolygon(polys);
      const mark_kr = {
        name: feature.properties.CTP_KOR_NM,
        location: poly,
      };

      // Save mark_kr to state or send to server as needed

      console.log("Mark saved:", mark_kr);
    });

    console.log("file open success");
  }, [data]);

  return <div>BoundarySet Component</div>;
};

export default BoundarySet;
