import React, { useEffect, useRef, useState } from 'react';
import MapApi  from '../MapCore/mapCore';
import projectConfig from '../norgeskart.json';
import EventHandler from '../MapCore/Events/EventHandler';
import { useEventStoreSelector } from '../MapCore/Events/Event/eventHooks';
import { clickCoordinates } from '../MapCore/Events/getClickCoordinatesSlice';
import { mapMoveEndCoordinates } from '../MapCore/Events/mapMoveSlice';

const MapTest = () => {
  const [showLayer1, setShowLayer1] = useState(false);
  // const eventHandler = EventHandler();
  const clickedCoordiantes = useEventStoreSelector(clickCoordinates);
  const mapMoveEnd = useEventStoreSelector(mapMoveEndCoordinates);

  const mapApi = MapApi();
  useEffect(() => {
    mapApi.init(projectConfig);
  },[])

  useEffect(() => {
    if (showLayer1) {
      mapApi.showLayer();
      // EventHandler.setClickCoordinates('456');
    }
  }, [showLayer1, mapApi])

  const handleShowLayer1 = (event: React.ChangeEvent<HTMLInputElement>): void => setShowLayer1(event.target.checked);

  EventHandler.getClickCoordinates$().subscribe(value => {
    console.log('GetClick coordinates: ', value);
  })
  EventHandler.mapMoveEnd$().subscribe(value => {
    console.log('MapMoveEnd: ', value);
  })
  return (
    <>
      {/* <div>
        <input type="checkbox" checked={showLayer1} onChange={handleShowLayer1}/> Ringve botaniske
      </div> */}
      <div>{clickedCoordiantes.coordinate[0]}, {clickedCoordiantes.coordinate[1]}</div>
      <div>{mapMoveEnd.coordinates}</div>
      <div id="map" className='ol-map'></div>
     </>
  );
}

export default MapTest;