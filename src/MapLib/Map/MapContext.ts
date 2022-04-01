import React from "react";
import * as ol from "ol";
import Map from "ol/Map";

export interface IMapContext {
  map?: Map;
}

// const MapContext = React.createContext<IMapContext | void>(undefined);
const MapContext = React.createContext({} as IMapContext);
export default MapContext;
