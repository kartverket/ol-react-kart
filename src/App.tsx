import { fromLonLat } from 'ol/proj';
import React, { useState } from 'react';
import mapConfig from './map/config.json';
import { Controls, FullScreenControl, Layers } from './map/Controls';
import Map from './map/Map';
import osm from './map/osm';
import TileLayer from './map/TileLayer';

function App() {
  const [center] = useState(mapConfig.center);
  const [zoom] = useState(9);

  return (
    <>
      <div className="App">
        <div className="logo-overlay">
          <a className="logo-kartverket" href="https://kartverket.no/">
            kartverket.no
          </a>
        </div>
        <h1>Norgeskart</h1>
      </div>
      <div>
        <Map center={fromLonLat(center)} zoom={zoom}>
          <Layers>
            <TileLayer source={osm()} zIndex={0} />
          </Layers>
          <Controls>
            <FullScreenControl />
          </Controls>
        </Map>
      </div>
    </>
  );
}

export default App;
