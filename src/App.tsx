import React from 'react';
import { useAppDispatch } from '../src/index';
import ChangeBaseLayer from './components/change-base-layer/ChangeBaseLayer';
import InfoPanel from './components/info-panel/InfoPanel';
import MainMenuPanel from './components/main-menu-panel/MainMenuPanel';
import { addProjectList, IProject, setStatusDone } from './components/main-menu-panel/projects-list/projectsListSlice';
import MainMap from './components/MainMap';
import Search from './components/search/Search';
import listProjects from './config/listprojects.json';

const App = () => {
  const dispatch = useAppDispatch();
  const projectsList = listProjects as IProject[];
  projectsList.forEach(p => {
    dispatch(addProjectList(p));
  });
  dispatch(setStatusDone());

  return (
    <div className="App">
      <MainMap />
      <div className="position-absolute mt-3 ms-4">
        <Search />
        <InfoPanel />
      </div>
      <MainMenuPanel />
      <ChangeBaseLayer />
    </div>
  );
}

export default App;
