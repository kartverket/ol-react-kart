import React, { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import queryString from 'query-string';

import OlMap from 'ol/Map';
import Overlay from 'ol/Overlay';
import View from 'ol/View';
import { ScaleLine, defaults } from 'ol/control';
import { getTopLeft, getWidth } from 'ol/extent';
import TileLayer from 'ol/layer/Tile';
import Projection from 'ol/proj/Projection';
import { WMTS } from 'ol/source';

import { GetClickCoordinates } from '../MapCore/Events/GetClickCoordinates';
import { MapMoveEnd } from '../MapCore/Events/MapMoveEnd';
import { Layers } from '../MapCore/Layers/Layers';

import { IProject } from '../MapCore/Models/config-model';
import { addProject, selectCenter } from '../MapCore/Project/projectSlice';
import { wmtsTileGrid } from '../MapCore/TileGrid/wmts';
import { useBaseConfigStore, useBaseLayersStore, useBaseMapStore } from '../app/baseStore';
import { center, marker, selection, useGlobalStore, wms } from '../app/globalStore';
import MapContext from '../app/mapContext';
import { useProjectStore } from '../app/projetStore';
import pinOrange from '../assets/pin-md-orange.png';
import { selectActiveProject } from '../components/main-menu-panel/projects-list/projectsListSlice';
import { useAppSelector, useEventDispatch, useEventSelector } from '../index';
import { generateKoordTransUrl } from '../utils/n3api';
import Position from './Position';

declare global {
  interface Window {
    olMap: any;
  }
}
window.olMap = window.olMap || {};

let myMap: OlMap;
let activateMap = false;

type Props = {
  children?: React.ReactNode;
};

const MainMap = ({ children }: Props) => {
  const baseConfig = useBaseConfigStore();
  const baseMap = useBaseMapStore();
  const baseLayers = useBaseLayersStore();

  const setSok = useGlobalStore(state => state.setSok);
  const setGlobalCenter = useGlobalStore(state => state.setCenter);
  const setGlobalMarker = useGlobalStore(state => state.setMarkerCenter);
  const setGlobalLayers = useGlobalStore(state => state.setLayers);
  const setGlobalZoom = useGlobalStore(state => state.setZoom);
  const setGlobalSelection = useGlobalStore(state => state.setSelection);
  const setGlobalWms = useGlobalStore(state => state.setWms);
  const search = useGlobalStore(state => state.sok);

  const eventDispatch = useEventDispatch();
  const mapMoveEnd = MapMoveEnd(eventDispatch);
  const getClickCoordinates = GetClickCoordinates();

  const toggleTile = useProjectStore(state => state.toggleTileLayer);

  const [token, setToken] = useState();

  const center = useEventSelector(selectCenter);

  const [mapInit, setMapInit] = useState(false);
  const activeProject = useAppSelector(selectActiveProject);
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<OlMap | null>(null);

  const queryValues = queryString.parse(window.location.search);
  const hashValues = queryString.parse(window.location.hash);
  Object.assign(queryValues, hashValues);

  const lat = Number(queryValues['lat']) || undefined;
  const lon = Number(queryValues['lon']) || undefined;
  const zoom = Number(queryValues['zoom']) || undefined;
  const project = (queryValues['project'] as string) || activeProject;
  const layers = queryValues['layers'] as string;
  const markerLat = Number(queryValues['markerLat']) || undefined;
  const markerLon = Number(queryValues['markerLon']) || undefined;
  const p = (queryValues['p'] as string) || undefined;
  const showSelection = Boolean(queryValues['showSelection'] || false);
  const sok = queryValues['sok'] as string;
  const wms = (queryValues['wms'] as string) || undefined;
  const epsg = (queryValues['epsg'] as string) || undefined;
  const drawing = (queryValues['drawing'] as string) || undefined;
  const addLayer = (queryValues['addLayer'] as string) || undefined;

  const generateToken = () => {
    if (baseConfig) {
      axios.get(`${baseConfig.gatekeeperhost}`).then(function (response) {
        setToken(response.data);
      });
    }
  };

  const init = (projectConfig: IProject) => {
    if (!activateMap) {
      if (projectConfig) {
        eventDispatch(addProject(projectConfig));
      } else {
        //eventDispatch(addProject(baseConfig.project));
        console.log('projectConfig is undefined');
      }

      if (!myMap) {
        const mapepsg = baseConfig.mapepsg;
        const sm = new Projection({
          code: mapepsg,
        });
        const projectExtent = baseConfig.mapbound.find(m => m.epsg === mapepsg)?.extent;
        const newExtent = [0, 0, 0, 0] as [number, number, number, number];
        if (projectExtent) {
          projectExtent
            .split(',')
            .map(e => Number(e))
            .forEach((v, index) => (newExtent[index] = v));
        }
        sm.setExtent(newExtent);

        const size = getWidth(newExtent) / 256;
        const resolutions = [];
        const matrixIds = [];
        for (let z = 0; z < 21; ++z) {
          resolutions[z] = size / Math.pow(2, z);
          matrixIds[z] = String(z);
        }
        const center = baseConfig.center;
        const zoom = baseConfig.zoom;

        const overlay = new Overlay({
          id: 'marker',
          position: center,
          positioning: 'bottom-center',
          element: document.getElementById('marker') || document.createElement('marker'),
        });
        const markerElement = overlay.getElement();
        if (markerElement) {
          markerElement.style.visibility = 'hidden';
        }

        myMap = new OlMap({
          layers: [
            new TileLayer({
              source: new WMTS({
                url: baseMap.url,
                layer: baseMap.layers,
                matrixSet: baseMap.matrixSet,
                projection: sm,
                tileGrid: wmtsTileGrid({
                  extent: newExtent,
                  origin: getTopLeft(newExtent),
                  resolutions: resolutions,
                  matrixIds: matrixIds,
                }),
                style: 'default',
                format: baseMap.format,
              }),
              zIndex: -1,
            }),
          ],
          overlays: [overlay],
          target: 'map',
          view: new View({
            center: center,
            projection: sm,
            zoom: zoom,
            minZoom: 3,
            maxZoom: 18,
            constrainResolution: true,
          }),
          controls: defaults({ zoom: true, attribution: false, rotate: false }).extend([new ScaleLine()]),
        });
        if (!mapRef.current) return;
        myMap.setTarget(mapRef.current);
        setMap(myMap);
        window.olMap = myMap;
        return () => myMap.setTarget(undefined);
      }
      activateMap = true;
    } else {
      generateToken();
      getClickCoordinates.activate(myMap);
      mapMoveEnd.activate(myMap);
    }
  };

  useEffect(() => {
    const addWms: wms = {
      showWms: true,
      wms: wms,
      addLayer: addLayer,
    };
    const selection: selection = {
      showSelection: showSelection,
      p: p,
    };
    const center: center = [lat, lon, zoom];
    const markerCenter: marker = [markerLat, markerLon];

    setGlobalCenter([lon, lat]);
    setGlobalLayers(layers);
    setGlobalMarker(markerCenter);
    setGlobalSelection(p);
    setSok(sok);
    //setGlobalWms(addWms);
  }, [layers, sok, project, drawing, wms, addLayer, showSelection, p, lat, lon, zoom, markerLat, markerLon]);

  const mapConfig = {
    center: [Number(lon), Number(lat)],
    zoom: Number(zoom),
  };

  useEffect(() => {
    if (center) {
      const projectProjection = myMap.getView().getProjection().getCode().replace(/.*:/, '');
      const transUrl = generateKoordTransUrl(center.lon, center.lat, projectProjection, center.epsg);
      axios.get(transUrl).then(function (response) {
        const transformedCoordinate = response.data;
        myMap.getView().setCenter([transformedCoordinate.x, transformedCoordinate.y]);
        if (Number(myMap.getView().getZoom()) < 10) {
          myMap.getView().setZoom(12);
        }
      });
    }
  }, [center]);

  useEffect(() => {
    const _visibleBaseLayer = baseLayers.layers.find(
      l => l.options.isbaselayer === true && l.options.visibility === true,
    );
    if (token && _visibleBaseLayer && baseLayers) {
      const layers = Layers(myMap);
      baseLayers.layers.forEach(b => {
        layers.hideLayer(b.guid);
      });
      layers.createTileLayer(_visibleBaseLayer, token);
    }
  }, [token, baseLayers]);

  useEffect(() => {
    if (toggleTile && token) {
      const layers = Layers(myMap);
      if (toggleTile.options.visibility === true) {
        layers.createTileLayer(toggleTile, token);
      } else {
        layers.hideLayer(toggleTile.guid);
      }
    }
  }, [toggleTile, token, eventDispatch]);

  useEffect(() => {
    if (!mapInit) {
      if (layers) {
        if (activeProject.Config) {
          activeProject.Config.layer.forEach((l: any) => {
            if (l.distributionProtocol === 'WMTS') {
              l.options.visibility = false;
            }
            if (l.name === layers) {
              l.options.visibility = true;
            }
            return l;
          });
        }
      }
      init(activeProject);
      setMapInit(true);
      window.olMap.on('moveend', updateMapInfoState);
    }
  }, [mapInit, activeProject.ProjectName, mapConfig.center, mapConfig.zoom]);

  useEffect(() => {
    if (activeProject.ProjectName) {
      if (mapInit) {
        setMapInit(false);
      }
    }
  }, [activeProject]);

  const setCenterToGeolocation = () => {
    const successGetGeolocation = (position: any) => {
      const coordinates = [position.coords.longitude, position.coords.latitude];
      setGlobalCenter(coordinates as any);
      /*
      appDispatch(
        setCenter({
          lon: coordinates[0],
          lat: coordinates[1],
          epsg: 'EPSG:4258',
        }),
      );
      */
    };
    const errorGetGeolcation = () => console.log('Unable to retrieve your location');

    if (!navigator.geolocation) {
      console.warn('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(successGetGeolocation, errorGetGeolcation);
    }
  };

  const updateMapInfoState = () => {
    const center = window.olMap.getView().getCenter();
    setGlobalCenter([center[0], center[1]]);
    setGlobalZoom(window.olMap.getView().getZoom());
  };

  return (
    <>
      <MapContext.Provider value={map}>
        <div id="map" ref={mapRef} className="ol-map">
          {children}
        </div>
        <div className="ol-geolocation ol-unselectable ol-control">
          <button onClick={() => setCenterToGeolocation()} type="button">
            <span className="material-icons-outlined">location_searching</span>
          </button>
        </div>
        <div className="display: none;">
          <div id="marker" className="marker">
            <img className="markerImg" src={pinOrange}></img>
          </div>
        </div>
        <Position />
      </MapContext.Provider>
    </>
  );
};

export default MainMap;
