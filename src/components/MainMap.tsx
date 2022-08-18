import React, { useEffect, useState } from 'react';
import MapApi from '../MapCore/mapCore';
// import { useEventStoreSelector } from '../MapCore/Events/Event/eventHooks';
import axios from 'axios';
import pinOrange from '../assets/pin-md-orange.png';
import { selectActiveProject } from '../components/main-menu-panel/projects-list/projectsListSlice';
import { useAppSelector, useEventDispatch } from '../index';
import { setCenter } from '../MapCore/Project/projectSlice';
import Position from './Position'

const MainMap = () => {
  const [mapInit, setMapInit] = useState(false);
  const activeProject = useAppSelector(selectActiveProject);
  const dispatch = useEventDispatch();

  const mapApi = MapApi();
  useEffect(() => {
    if (!mapInit) {
      const localUrl = document.location.href;
      const projectUrl = localUrl + 'projects/' + activeProject.SiteTitle + '.json';
      axios.get(`${projectUrl}`).then(function (response) {
        mapApi.init(response.data);
        setMapInit(true);
      });
    }
  }, [mapInit, mapApi, activeProject.SiteTitle]);

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
      dispatch(setCenter({
        lon: coordinates[0],
        lat: coordinates[1],
        epsg: 'EPSG:4258',
      }));
    }
    const errorGetGeolcation = () => console.log('Unable to retrieve your location');

    if (!navigator.geolocation) {
      console.warn('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(successGetGeolocation, errorGetGeolcation);
    }
  }

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
      {mapInit ? <Position/> : null}
    </>
  );
};

export default MainMap;
