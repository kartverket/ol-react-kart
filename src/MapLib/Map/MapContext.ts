import Map from 'ol/Map';
import React from 'react';

export interface IMapContext {
  map?: Map;
}

// const MapContext = React.createContext<IMapContext | void>(undefined);
const MapContext = React.createContext({} as IMapContext);
export default MapContext;
