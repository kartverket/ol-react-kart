import React, { useEffect, useRef, useState } from 'react';
import  MapApi  from '../MapCore/mapCore';
import projectConfig from '../config/norgeskart.json';
// import { useEventStoreSelector } from '../MapCore/Events/Event/eventHooks';
import { useEventSelector } from '../../src/index';
import { selectClickCoordinates } from '../MapCore/Events/getClickCoordinatesSlice';
import { selectMapMoveEndCoordinates } from '../MapCore/Events/mapMoveSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';

const MainMap = () => {
  const [mapInit, setMapInit] = useState(false);

  const mapApi = MapApi();
  useEffect(() => {
    if (!mapInit) {
      mapApi.init(projectConfig);
      setMapInit(true);
    }
  },[mapInit, mapApi])

  return (
    <>
      <div id="map" className='ol-map'></div>
      <div className="ol-geolocation ol-unselectable ol-control">
        <button onClick={() => console.log('GEOLOCATION NOT IMPLEMENTED')} type="button">
        <FontAwesomeIcon icon={faCrosshairs} />
        </button>
      </div>
     </>
  );
}

export default MainMap;