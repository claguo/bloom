import React, { useEffect, useState, useRef } from "react";
import Globe from "react-globe.gl";
import { MeshBasicMaterial } from "three";
import useWindowDimensions from "../assets/WindowDimensions";
import { useCountry } from "../assets/CountryContext";
import { useStatesData } from "../assets/StatesContext";
import worldData from "../data.geojson";
import usaData from "../datausa3.geojson";
import randomPointsOnPolygon from "random-points-on-polygon";

function GlobeRender({ isUSA = false, active, setActive }) {
  const globeEl = useRef();
  const containerRef = useRef();
  const { countries, setCountries } = useCountry();
  const { statesData, setStatesData } = useStatesData();
  const [points, setPoints] = useState([]);
  const [containerWidth, setContainerWidth] = useState(0);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { width } = useWindowDimensions();
  const globeWidth = containerWidth;

  // Configure view settings based on whether it's USA or world view
  const globeConfig = {
    altitude: width < 1024 ? 4 : width < 1680 ? 2.5 : 2,
    defaultLat: isUSA ? 39.6 : 0,
    defaultLng: isUSA ? -98.5 : 0,
    dataSource: isUSA ? usaData : worldData,
    dataContext: isUSA ? statesData : countries,
    setDataContext: isUSA ? setStatesData : setCountries,
    abortProperty: isUSA ? "NUM_ABORT_RES" : "NUM_ABORT",
    pointDivisor: isUSA ? 1000 : 100000,
  };

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setContainerWidth(entry.contentRect.width);
        }
      });
      resizeObserver.observe(containerRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);

    fetch(globeConfig.dataSource)
      .then((res) => res.json())
      .then((jsonData) => {
        globeConfig.setDataContext(jsonData);
        const numAborts = jsonData.features.map((feature) => {
          const value = feature.properties[globeConfig.abortProperty];
          return typeof value === "number" ? value : 0;
        });
        const newPoints = [];
        jsonData.features?.forEach((feature, key) => {
          const numPoints = Math.floor(
            numAborts[key] / globeConfig.pointDivisor
          );
          if (numPoints > 0) {
            for (let i = 0; i < numPoints; i++) {
              try {
                const point = randomPointsOnPolygon(1, feature);
                if (
                  point &&
                  point[0] &&
                  point[0].geometry &&
                  point[0].geometry.coordinates
                ) {
                  newPoints.push({
                    lat: point[0].geometry.coordinates[1],
                    lng: point[0].geometry.coordinates[0],
                  });
                }
              } catch (error) {
                console.error(
                  "Error generating point for feature:",
                  feature.properties.ADMIN,
                  error
                );
              }
            }
          }
        });
        setPoints(newPoints);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUSA]);

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.pointOfView({
        lat: globeConfig.defaultLat,
        lng: globeConfig.defaultLng,
        altitude: globeConfig.altitude,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, isUSA]);

  // Helper function to calculate center of coordinates
  const calculateCenter = (coordinates) => {
    let minLat = Infinity;
    let maxLat = -Infinity;
    let minLng = Infinity;
    let maxLng = -Infinity;

    const processCoordinate = (coord) => {
      if (Array.isArray(coord[0])) {
        coord.forEach(processCoordinate);
      } else {
        minLat = Math.min(minLat, coord[1]);
        maxLat = Math.max(maxLat, coord[1]);
        minLng = Math.min(minLng, coord[0]);
        maxLng = Math.max(maxLng, coord[0]);
      }
    };

    processCoordinate(coordinates);
    return {
      lat: (minLat + maxLat) / 2,
      lng: (minLng + maxLng) / 2,
    };
  };

  // Rotate to active country/state
  useEffect(() => {
    if (globeEl.current && active) {
      try {
        const coordinates = active.geometry.coordinates;
        let center;

        if (!isUSA) {
          // For world countries, handle different geometry types
          if (coordinates) {
            // Handle MultiPolygon (array of polygons)
            if (Array.isArray(coordinates[0][0])) {
              center = calculateCenter(coordinates[0][0]);
            }
            // Handle Polygon (single polygon)
            else if (Array.isArray(coordinates[0])) {
              center = calculateCenter(coordinates[0]);
            }
            // Handle Point
            else if (Array.isArray(coordinates)) {
              center = { lat: coordinates[1], lng: coordinates[0] };
            }
          } else {
            center = { lat: 0, lng: 0 };
          }
        } else {
          // For USA states
          if (coordinates && coordinates[0]) {
            center = calculateCenter(coordinates[0]);
          } else {
            center = { lat: 39.6, lng: -98.5 };
          }
        }

        // Animate to the new position
        globeEl.current.pointOfView(
          {
            lat: center.lat,
            lng: center.lng,
            altitude: globeConfig.altitude,
          },
          1000
        ); // 1000ms animation duration
      } catch (error) {
        console.error("Error calculating center coordinates:", error);
        // Fallback to default view
        globeEl.current.pointOfView({
          lat: globeConfig.defaultLat,
          lng: globeConfig.defaultLng,
          altitude: globeConfig.altitude,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, isUSA]);

  // Handle country click
  const handleCountryClick = (country) => {
    setActive(country);
  };

  // Handle background click
  const handleBackgroundClick = () => {
    setActive(null);
    if (globeEl.current) {
      globeEl.current.pointOfView(
        {
          lat: globeConfig.defaultLat,
          lng: globeConfig.defaultLng,
          altitude: globeConfig.altitude,
        },
        1000
      );
    }
  };

  const getPolygonsData = () => {
    if (isUSA) {
      return globeConfig.dataContext.features;
    }
    return globeConfig.dataContext.features.filter(
      (d) => d.properties.ISO_A2 !== "AQ"
    );
  };

  return (
    <div ref={containerRef} className="flex-1 h-1/2 lg:h-full">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-bg-neutral p-[16px]">
          <div className="h-full w-full bg-bg-green rounded-[16px] overflow-hidden">
            <div className="h-full w-full bg-element-green animate-[loading_2s_ease-in-out_forwards]" />
          </div>
        </div>
      )}
      <Globe
        ref={globeEl}
        width={globeWidth}
        backgroundColor={"#325636"}
        showGlobe={true}
        showAtmosphere={false}
        globeMaterial={new MeshBasicMaterial({ color: "#6D8964" })}
        onGlobeClick={handleBackgroundClick}
        polygonsData={getPolygonsData()}
        onPolygonHover={setHoveredCountry}
        onPolygonClick={handleCountryClick}
        polygonCapColor={(c) =>
          c === active || c === hoveredCountry ? "#4D6F45" : "#325636"
        }
        polygonCapCurvatureResolution={2}
        polygonAltitude={0.002}
        polygonSideColor={"#325636"}
        htmlElementsData={points}
        htmlElement={(d) => {
          const el = document.createElement("div");
          el.textContent = "🌸";
          el.style.fontSize = "12px";
          return el;
        }}
      />
    </div>
  );
}

export default GlobeRender;
