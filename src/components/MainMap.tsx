import React, { useEffect, useState } from 'react';
import  MapApi  from '../MapCore/mapCore';
// import { useEventStoreSelector } from '../MapCore/Events/Event/eventHooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '../index';
import { selectActiveProject } from '../components/main-menu-panel/projects-list/projectsListSlice';
import axios from 'axios';

const MainMap = () => {
  const [mapInit, setMapInit] = useState(false);
  const activeProject = useAppSelector(selectActiveProject);

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
  },[mapInit, mapApi, activeProject.SiteTitle])

  useEffect(() => {
    if (activeProject.SiteTitle) {
      if (mapInit) {
        mapApi.destroyProject();
        setMapInit(false);
      }
    }
  }, [activeProject])

  

  

  return (
    <>
      <div id="map" className='ol-map'></div>
      <div className="ol-geolocation ol-unselectable ol-control">
        <button onClick={() => console.log('GEOLOCATION NOT IMPLEMENTED')} type="button">
        <FontAwesomeIcon icon={faCrosshairs} />
        </button>
      </div>
     </>
  );
}

export default MainMap;