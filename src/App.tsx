import React, { useEffect, useState } from 'react';
import ChangeBaseLayer from './components/change-base-layer/ChangeBaseLayer';
import MainMenuPanel from './components/main-menu-panel/MainMenuPanel';
import MapTest from './components/MapTest';
import Logo from './components/Logo';
import Search from './components/search/Search';
import listProjects from './config/listprojects.json';
import { IProject, addProjectList, setStatusDone } from './components/main-menu-panel/projects-list/projectsListSlice';
// import { useAppDispatch } from './app/hooks';
// import SearchInput from './components/search/SearchInput';
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
      {/*<MainMap />*/}
      
      <MapTest/>
      <div className='position-absolute mt-3 ms-4'>
        <Search />
      </div>
      <MainMenuPanel/>
      <ChangeBaseLayer />
    </div>
  );
}

export default App;
