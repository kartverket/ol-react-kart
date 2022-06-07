import React, { useEffect, useState } from 'react';
import ChangeBaseLayer from './components/change-base-layer/ChangeBaseLayer';
import MainMenuPanel from './components/main-menu-panel/MainMenuPanel';
import MainMap from './components/MainMap';
import Logo from './components/Logo';
import Search from './components/search/Search';
import listProjects from './config/listprojects.json';
import { IProject, addProjectList, setStatusDone } from './components/main-menu-panel/projects-list/projectsListSlice';
import InfoPanel from './components/info-panel/InfoPanel';
import { useAppDispatch } from '../src/index';


function App() {
  const dispatch = useAppDispatch();
  const projectsList = listProjects as IProject[];  
  projectsList.forEach(p => {
    dispatch(addProjectList(p));
  })
  dispatch(setStatusDone())
    
  
  return (
    <div className="App">
      <MainMap/>
      <div className='position-absolute mt-3 ms-4'>
        <Search />
        <InfoPanel />
      </div>
      <MainMenuPanel/>
      <ChangeBaseLayer />
    </div>
  );
}

export default App;
