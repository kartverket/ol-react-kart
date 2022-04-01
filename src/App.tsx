import { fromLonLat } from 'ol/proj';
import React, { useState } from 'react';
import mapConfig from './map/config.json';
import Map from './map/Map';
import osm from './map/osm';
import TileLayer from './map/TileLayer';

interface Props {
  children: React.ReactNode;
}

const Layers = ({ children }: Props) => {
  return <div>{children}</div>;
};

function App() {
  const [center] = useState(mapConfig.center);
  const [zoom] = useState(9);

  return (
    <>
      <div>
        <Map center={fromLonLat(center)} zoom={zoom}>
          <Layers>
            <TileLayer source={osm()} zIndex={0} />
          </Layers>
        </Map>
      </div>
    </>
  );
}

export default App;
