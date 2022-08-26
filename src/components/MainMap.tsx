import React, { useEffect, useState } from 'react';
import MapApi from '../MapCore/mapCore';
import axios from 'axios';
import queryString from 'query-string';
import pinOrange from '../assets/pin-md-orange.png';
import { selectActiveProject } from '../components/main-menu-panel/projects-list/projectsListSlice';
import { useAppSelector } from '../index';
import Position from './Position';
import {
  useGlobalStore, center,
  marker,
  selection,
  wms,
} from '../app/globalStore';

const MainMap = () => {
  const setSok = useGlobalStore(state => state.setSok);
  const setGlobalCenter = useGlobalStore(state => state.setCenter);
  const setGlobalMarker = useGlobalStore(state => state.setMarkerCenter);
  const setGlobalLayers = useGlobalStore(state => state.setLayers);
  const setGlobalZoom = useGlobalStore(state => state.setZoom);
  const setGlobalSelection = useGlobalStore(state => state.setSelection);
  const setGlobalWms = useGlobalStore(state => state.setWms);
  const search = useGlobalStore(state => state.sok);

  //const unsub1 = useGlobalStore.subscribe(console.log)

  const [mapInit, setMapInit] = useState(false);
  const activeProject = useAppSelector(selectActiveProject);
  const mapApi = MapApi();

  const queryValues = queryString.parse(window.location.search);
  const hashValues = queryString.parse(window.location.hash);
  Object.assign(queryValues, hashValues);
  // http://localhost:3000/?project=norgeskart&layers=1002&zoom=16&lat=6635873.73&lon=213092.49&markerLat=6635921.241120491&markerLon=212992.02435685016&p=Seeiendom&sok=Semsveien&showSelection=true
  // http://localhost:3000/?project=norgeskart&layers=landkart&zoom=3&lat=7197864.00&lon=396722.00

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
    if (!mapInit) {
      const projectUrl = document.location.origin + document.location.pathname + 'projects/' + activeProject.SiteTitle + '.json';
      axios.get(`${projectUrl}`).then(function (response) {
        response.data.config.center = mapConfig.center;
        response.data.config.zoom = mapConfig.zoom;
        if (layers) {
          response.data.config.layer.forEach((l: any) => {
            if (l.distributionProtocol === 'WMTS') {
              l.options.visibility = "false";
            }
            if (l.name === layers) {
              l.options.visibility = "true";
            }
            return l
          });
        }
        mapApi.init(response.data);
        setMapInit(true);
        window.olMap.on('moveend', updateMapInfoState);
      });
    }
  }, [mapInit, mapApi, activeProject.SiteTitle, mapConfig.center, mapConfig.zoom]);

  useEffect(() => {
    if (activeProject.SiteTitle) {
      if (mapInit) {
        mapApi.destroyProject();
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
      <div id="map" className="ol-map"></div>
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
      {mapInit ? <Position /> : null}
    </>
  );
};

export default MainMap;
