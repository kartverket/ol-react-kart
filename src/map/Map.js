/* eslint-disable react/prop-types */
import * as ol from 'ol';
import React, { useEffect, useRef, useState } from 'react';
import './Map.scss';
import MapContext from './MapContext';

const Map = ({ children, zoom, center }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);

  useEffect(() => {
    let options = {
      view: new ol.View({ zoom, center }),
      layers: [],
      controls: [],
      overlays: [],
    };

    let mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);

    return () => mapObject.setTarget(undefined);
  }, [center, zoom]);

  useEffect(() => {
    if (!map) return;
    map.getView().setZoom(zoom);
  }, [map, zoom]);

  useEffect(() => {
    if (!map) return;
    map.getView().setCenter(center);
  }, [center, map]);

  return (
    <MapContext.Provider value={{ map }}>
      <div ref={mapRef} className="ol-map">
        {children}
      </div>
    </MapContext.Provider>
  );
};

export default Map;
