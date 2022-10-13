import queryString from 'query-string';
import setQuery from 'set-query-string';
import create from 'zustand';

import { Coordinate } from 'ol/coordinate';

export type marker = [markerLat?: number, markerLon?: number];
export type selection = {
  p?: string;
  showSelection?: boolean;
  selection?: string;
  selectionType?: string;
};
export type wms = {
  showWms?: boolean;
  wms?: string | undefined;
  addLayer?: string | undefined;
  wmsStyles?: string | undefined;
};
export interface IGlobalState {
  center?: Coordinate;
  zoom?: number;
  project?: string;
  layers?: string;
  marker?: marker;
  selection?: string;
  sok?: string;
  wms?: wms;
  drawing?: string;

  setCenter: (center: Coordinate) => void;
  setZoom: (zoom: number) => void;
  setProject: (project: string | undefined) => void;
  setLayers: (layers: string) => void;
  setMarkerCenter: (marker: marker) => void;
  setSelection: (selection: string | undefined) => void;
  setSok: (sok: string) => void;
  setWms: (wms: wms) => void;
  setDrawing: (drawing: string | undefined) => void;
}
const updateURL = (state: IGlobalState) => {
  const { center, zoom, project, layers, marker, selection, sok, wms, drawing } = state;
  const query = {
    project: project ? project : undefined,
    layers: layers ? layers : undefined,
    zoom: zoom ? zoom.toString() : undefined,
    lat: center ? center[1] : undefined,
    lon: center ? center[0] : undefined,
    markerLat: marker ? marker[1] : undefined,
    markerLon: marker ? marker[0] : undefined,
    selection: selection ? selection : undefined,
    sok: sok ? sok : undefined,
    wms: wms ? wms : undefined,
    drawing: drawing ? drawing : undefined,
  };
  const _queryString = queryString.stringify(query, {
    skipNull: true,
    sort: false,
  });
  setQuery(_queryString);
};
export const useGlobalStore = create<IGlobalState>(set => ({
  center: [0, 0],
  zoom: 10,
  layers: '',
  sok: '',
  setCenter: (center: Coordinate) =>
    set(state => {
      updateURL({ ...state, center });
      return { ...state, center };
    }),
  setZoom: (zoom: number) =>
    set(state => {
      updateURL({ ...state, zoom });
      return { ...state, zoom };
    }),
  setProject: (project: string | undefined) =>
    set(state => {
      updateURL({ ...state, project });
      return { ...state, project };
    }),
  setLayers: (layers: string) =>
    set(state => {
      const queryValues = queryString.parse(window.location.search);
      queryValues.layers = layers;
      setQuery(queryValues);
      updateURL({ ...state, layers });
      return { ...state, layers };
    }),
  setMarkerCenter: (marker: marker) =>
    set(state => {
      updateURL({ ...state, marker });
      return { ...state, marker };
    }),
  setSelection: (selection: string | undefined) =>
    set(state => {
      updateURL({ ...state, selection });
      return { ...state, selection };
    }),
  setSok: (sok: string) =>
    set(state => {
      const queryValues = queryString.parse(window.location.search);
      queryValues.sok = sok;
      setQuery(queryValues);
      //updateURL(state);
      return { ...state, sok };
    }),
  setWms: (wms: wms) =>
    set(state => {
      updateURL({ ...state, wms });
      return { ...state, wms };
    }),
  setDrawing: (drawing: string | undefined) =>
    set(state => {
      updateURL({ ...state, drawing });
      return { ...state, drawing };
    }),
}));
