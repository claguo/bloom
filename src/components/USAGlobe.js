import React, {useEffect, useState, useRef } from "react";
import Globe from 'react-globe.gl';
import { MeshBasicMaterial } from 'three';
import useWindowDimensions from '../assets/WindowDimensions';
import { useUSAState } from '../assets/StateContext';
import data from '../datausa3.geojson';
import randomPointsOnPolygon from "random-points-on-polygon";

function USAGlobe(props) {
  const {USAStates, setUSAStates} = useUSAState();
  const {hoverD, setHoverD} = props;
  const [numAbortCoords, setNumAbortCoords] = useState([]);
  const globeEl = useRef();

  useEffect(() => {
    fetch(data)
      .then((res) => res.json())
      .then((jsonData) => {
        setUSAStates(jsonData);
        const numAborts = jsonData.features.map((feature) => feature.properties.NUM_ABORT_RES);
        const newPoints = [];
        jsonData.features.forEach((feature, key) => {
          for (let i = 0; i < numAborts[key] / 1000; i++) {
            const point = randomPointsOnPolygon(1, feature);
            newPoints.push({ lat: point[0].geometry.coordinates[1], lng: point[0].geometry.coordinates[0] });
          }
        });
        setNumAbortCoords(newPoints);
      })
      .catch((error) => {
        console.error('Error loading data:', error);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    globeEl.current.pointOfView({ lat: 39.6, lng: -98.5, altitude: 1.5 });
  }, []);

  const {width, height} = useWindowDimensions();

  return (
    <Globe
      ref={globeEl}
      width={width/5*3}
      height={height}
      backgroundColor={'#ECE9E6'}
      showGlobe={true}
      showAtmosphere={false}

      globeMaterial={(new MeshBasicMaterial({ color: '#367BFA' }))}
      polygonsData={USAStates.features}
      onPolygonHover={setHoverD}
      polygonCapColor={(c) => c === hoverD ? '#0043C5' : '#0043C5cc'}
      polygonCapCurvatureResolution={2}
      polygonAltitude={0.002}
      polygonSideColor={() => '#ffffff00'}

      htmlElementsData={numAbortCoords}
      htmlElement={(d) => {
        const el = document.createElement('div');
        el.textContent = '🌸'
        el.style.fontSize = '12px'
        el.style.opacity = props.openModal ? '0' : '100'
        return el;
      }}
    />
  )
}

export default USAGlobe;