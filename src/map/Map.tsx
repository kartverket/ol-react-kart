/* eslint-disable react/prop-types */
import * as ol from 'ol';
import React, { useEffect, useRef, useState } from 'react';
import './Map.scss';
import MapContext from './MapContext';

interface Props {
  children: React.ReactNode;
  zoom: number;
  center: Array<number>;
}

const Map = ({ children, zoom, center }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>({ map: undefined });

  useEffect(() => {
    const options = {
      view: new ol.View({ zoom, center }),
      layers: [],
      controls: [],
      overlays: [],
    };

    const mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current || undefined);

    setMap({ map: mapObject });

    return () => mapObject.setTarget(undefined);
  }, [center, zoom]);

  useEffect(() => {
    if (!map?.map) return;
    map.map.getView().setZoom(zoom);
  }, [map, zoom]);

  useEffect(() => {
    if (!map?.map) return;
    map.map.getView().setCenter(center);
  }, [center, map]);

  return (
    <MapContext.Provider value={{ map: map.map }}>
      <div ref={mapRef} className="ol-map">
        {children}
      </div>
    </MapContext.Provider>
  );
};

export default Map;
