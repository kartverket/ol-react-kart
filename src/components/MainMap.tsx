import React, { useEffect, useState } from 'react';
import MapApi from '../MapCore/mapCore';
import axios from 'axios';
import queryString from 'query-string';
import setQuery from 'set-query-string';
import pinOrange from '../assets/pin-md-orange.png';
import { selectActiveProject } from '../components/main-menu-panel/projects-list/projectsListSlice';
import { useAppSelector, useAppDispatch } from '../index';
import { setCenter } from '../MapCore/Project/projectSlice';
import {
  center,
  marker,
  selection,
  setCenter as setCenterMap,
  setLayers,
  setMarkerCenter,
  setP,
  setSok,
  setWms,
  wms,
} from './mainMapSlice';
import Position from './Position';
import { selectVisibleBaseLayer } from '../MapCore/Layers/layersSlice';
import { useEventSelector } from '../index';

const MainMap = (props: any) => {
  const [mapInit, setMapInit] = useState(false);
  const activeProject = useAppSelector(selectActiveProject);
  const appDispatch = useAppDispatch();
  const mapApi = MapApi();
  const visibleBaseLayer = useEventSelector(selectVisibleBaseLayer);

  const queryValues = queryString.parse(window.location.search);
  const hashValues = queryString.parse(window.location.hash);
  Object.assign(queryValues, hashValues);
  //http://localhost:3000/?project=norgeskart&layers=1002&zoom=16&lat=6635873.73&lon=213092.49&markerLat=6635921.241120491&markerLon=212992.02435685016&p=Seeiendom&sok=Semsveien&showSelection=true
  const lat = Number(queryValues['lat'] || props.lat);
  const lon = Number(queryValues['lon'] || props.lon);
  const zoom = Number(queryValues['zoom'] || props.zoom);
  const project = (queryValues['project'] as string) || activeProject;
  const layers = queryValues['layers'] || props.layers;
  const markerLat = Number(queryValues['markerLat'] || props.markerLat);
  const markerLon = Number(queryValues['markerLon'] || props.markerLon);
  const p = (queryValues['p'] as string) || undefined;
  const showSelection = Boolean(queryValues['showSelection'] || false);
  const sok = (queryValues['sok'] as string) || undefined;
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

    appDispatch(setCenterMap(center));
    //appDispatch(setProject(project));
    appDispatch(setLayers(layers));
    appDispatch(setMarkerCenter(markerCenter));
    appDispatch(setP(selection));
    appDispatch(setSok(sok));
    appDispatch(setWms(addWms));
    //appDispatch(setDrawing(drawing));
  }, [appDispatch, layers, sok, project, drawing, wms, addLayer, showSelection, p, lat, lon, zoom, markerLat, markerLon]);

  const mapConfig = {
    center: [Number(lon), Number(lat)],
    zoom: Number(zoom),
  };
  useEffect(() => {
    if (!mapInit) {
      const localUrl = document.location.origin;
      const projectUrl = localUrl + '/projects/' + activeProject.SiteTitle + '.json';
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
      appDispatch(
        setCenter({
          lon: coordinates[0],
          lat: coordinates[1],
          epsg: 'EPSG:4258',
        }),
      );
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
    const queryValues = queryString.parse(window.location.search);
    queryValues.lon = center[0];
    queryValues.lat = center[1];
    queryValues.zoom = window.olMap.getView().getZoom();
    if (visibleBaseLayer) {
      queryValues.layers = visibleBaseLayer.name;
    }
    setQuery(queryValues);
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
