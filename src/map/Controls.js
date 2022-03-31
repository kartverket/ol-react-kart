/* eslint-disable react/prop-types */
import { FullScreen } from 'ol/control';
import React, { useContext, useEffect } from 'react';
import MapContext from './MapContext';

const Controls = ({ children }) => {
  return <div>{children}</div>;
};

const FullScreenControl = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;
    let fullScreenControl = new FullScreen({});
    map.controls.push(fullScreenControl);
    return () => map.controls.remove(fullScreenControl);
  }, [map]);

  return null;
};

const Layers = ({ children }) => {
  return <div>{children}</div>;
};

export { Controls, FullScreenControl, Layers };
