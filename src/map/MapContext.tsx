import Map from 'ol/Map';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export type TMapProps = {};

export type TMapState = {
  mapContext?: IMapContext;
};

export interface IMapContext {
  map?: Map;
}

// const MapContext = React.createContext<IMapContext | void>(undefined);
export const MapContext = React.createContext({} as IMapContext);
export default MapContext;
