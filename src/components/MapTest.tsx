import React, { useEffect, useRef, useState } from 'react';
import MapApi  from '../MapCore/mapCore';
import projectConfig from '../norgeskart.json';

const MapTest = () => {
  const [showLayer1, setShowLayer1] = useState(false);
  
  const mapApi = MapApi();
  useEffect(() => {
    mapApi.init(projectConfig);
    // mapApi.showLayer();
    // mapApi.setCenter();
  },[])

  useEffect(() => {
    if (showLayer1) {
      mapApi.showLayer();
    }
  }, [showLayer1, mapApi])

  const handleShowLayer1 = (event: React.ChangeEvent<HTMLInputElement>): void => setShowLayer1(event.target.checked);


  
  return (
    <>
      <div>
        <input type="checkbox" checked={showLayer1} onChange={handleShowLayer1}/> Ringve botaniske
      </div>
      <div id="map" className='ol-map'></div>
     </>
  );
}

export default MapTest;