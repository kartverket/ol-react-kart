import React, { useEffect, useRef, useState } from 'react';
import  MapApi  from '../MapCore/mapCore';
import projectConfig from '../config/norgeskart.json';
// import { useEventStoreSelector } from '../MapCore/Events/Event/eventHooks';
import { useEventSelector } from '../../src/index';
import { selectClickCoordinates } from '../MapCore/Events/getClickCoordinatesSlice';
import { selectMapMoveEndCoordinates } from '../MapCore/Events/mapMoveSlice';

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
     </>
  );
}

export default MainMap;