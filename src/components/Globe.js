import React, {useEffect, useState } from "react";
import Globe from 'react-globe.gl';
import { MeshBasicMaterial } from 'three';
import useWindowDimensions from '../assets/WindowDimensions';
import { useCountry } from '../assets/CountryContext';

import data from '../data.geojson';
import * as turf from "@turf/turf";
import randomPointsOnPolygon from "random-points-on-polygon";

function Map(props) {
  const {countries, setCountries} = useCountry();
  const [abortCoords, setAbortCoords] = useState([]);
  const {hoverD, setHoverD} = props;

  // useEffect(() => {
  //   fetch(data).then(res => res.json()).then((jsonData) => {
  //     setCountries(jsonData);
  //     const numAborts = jsonData.features.map((feature) => feature.properties.NUM_ABORT);
  //     const newPoints = [];
  //     // const flowerPos = [];
  //     jsonData.features.forEach((feature, key) => {
  //       for (let i=0; i<numAborts[key]/100000; i++) {
  //         const point = randomPointsOnPolygon(1, feature);
  //         newPoints.push({lat: point[0].geometry.coordinates[1], lng: point[0].geometry.coordinates[0]})
  //       }
  //     })
  //     setAbortCoords(newPoints);
  //   })
  //   .catch((error) => {
  //     console.error('Error loading data:', error);
  //   });
  // }, []);
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

  // useEffect(() => {
  //   // Render the points on the globe
  //     abortCoords.forEach((point) => {
  //       // Add each point to the globe
  //       globe.point().position([point.lng, point.lat]).size(0.1).color('red');
  //     });
  // }, [abortCoords, globe]);


  // function pointsInBbox(bboxes, numPoints) {
  //   const points = [];
  //   bboxes.forEach((bbox, key) => {
  //     for (let i=0; i < numPoints[key]/10000; i++) {
  //       const randomLat = bbox[1] + Math.random() * (bbox[3] - bbox[1]);
  //       const randomLng = bbox[0] + Math.random() * (bbox[2] - bbox[0]);
  //       points.push({ lat: randomLat, lng: randomLng });
  //     }
  //   });
  //   return points;
  // }

  // const N = 20;
  // const arcsData = [...Array(N).keys()].map(() => ({
  //   startLat: (Math.random() - 0.5) * 180,
  //   startLng: (Math.random() - 0.5) * 360,
  //   endLat: (Math.random() - 0.5) * 180,
  //   endLng: (Math.random() - 0.5) * 360,
  //   color: [['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)], ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]]
  // }));
// console.log(countries.features.properties.ADMIN)
  const {width, height} = useWindowDimensions();

  return (
    <Globe
      width={width/5*3}
      height={height}
      backgroundColor={'#ECE9E6'}
      showGlobe={true}
      showAtmosphere={false}
      // arcsData={arcsData}
      // arcColor={() => ['#dac4ff', '#fc8403']}
      // arcDashLength={() => Math.random()}
      // arcStroke={1}
      globeMaterial={(new MeshBasicMaterial({ color: '#367BFA' }))}
      polygonsData={countries.features.filter(d => d.properties.ISO_A2 !== 'AQ')}
      onPolygonHover={setHoverD}
      // onPolygonLeave={() => setPolygonHovered()}
      polygonCapColor={(c) => c === hoverD ? '#0043C5' : '#0043C5cc'}
      polygonCapCurvatureResolution={2}
      polygonAltitude={0.002}
      polygonSideColor={() => '#ffffff00'}
      // pointColor={() => '#00BF8C'}
      // pointsData={abortCoords}
      // pointRadius={0.2}
      // pointAltitude={0.004}
      
      // polygonLabel={({ properties: d }) => `
      //   <div class='polygon-label'>
      //     <b>${d.ADMIN}</b>
      //     <p>~${d.NUM_ABORT.toLocaleString('en', {useGrouping:true})} abortions per year</p>
      //   </div>
      //   }
      // `}

      // labelsData={countries.features.filter(d => d.properties.ISO_A2 !== 'AQ')}
      // labelLat={d => d.properties.latitude}
      // labelLng={d => d.properties.longitude}
      // labelText={d => d.properties.name}
      // labelSize={d => Math.sqrt(d.properties.pop_max) * 4e-4}
      // labelDotRadius={d => Math.sqrt(d.properties.pop_max) * 4e-4}
      // labelColor={() => 'rgba(255, 165, 0, 0.75)'}
      // labelResolution={2}

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