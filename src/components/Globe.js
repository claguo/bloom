import React, {useEffect, useState } from "react";
import Globe from 'react-globe.gl';
import { MeshBasicMaterial } from 'three';
import useWindowDimensions from '../assets/WindowDimensions';
import { useCountry } from '../assets/CountryContext';
import data from '../data.geojson';
import randomPointsOnPolygon from "random-points-on-polygon";

function Map(props) {
  const {countries, setCountries} = useCountry();
  const [abortCoords, setAbortCoords] = useState([]);
  const {hoverD, setHoverD} = props;

  useEffect(() => {
    fetch(data)
      .then((res) => res.json())
      .then((jsonData) => {
        setCountries(jsonData);
        const numAborts = jsonData.features.map((feature) => feature.properties.NUM_ABORT);
        const newPoints = [];
        jsonData.features.forEach((feature, key) => {
          for (let i = 0; i < numAborts[key] / 100000; i++) {
            const point = randomPointsOnPolygon(1, feature);
            newPoints.push({ lat: point[0].geometry.coordinates[1], lng: point[0].geometry.coordinates[0] });
          }
        });
        setAbortCoords(newPoints);
      })
      .catch((error) => {
        console.error('Error loading data:', error);
      });
  }, []);

  const {width, height} = useWindowDimensions();

  return (
    <Globe
      width={width/5*3}
      height={height}
      backgroundColor={'#ECE9E6'}
      showGlobe={true}
      showAtmosphere={false}
      globeMaterial={(new MeshBasicMaterial({ color: '#367BFA' }))}
      polygonsData={countries.features.filter(d => d.properties.ISO_A2 !== 'AQ')}
      onPolygonHover={setHoverD}
      polygonCapColor={(c) => c === hoverD ? '#0043C5' : '#0043C5cc'}
      polygonCapCurvatureResolution={2}
      polygonAltitude={0.002}
      polygonSideColor={() => '#ffffff00'}

      htmlElementsData={abortCoords}
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

export default Map;