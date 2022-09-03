import React from 'react';

import { useAppDispatch } from '../src/index';
import MainMap from './components/MainMap';
import ChangeBaseLayer from './components/change-base-layer/ChangeBaseLayer';
import InfoPanel from './components/info-panel/InfoPanel';
import MainMenuPanel from './components/main-menu-panel/MainMenuPanel';
import { IProject, addProjectList, setStatusDone } from './components/main-menu-panel/projects-list/projectsListSlice';
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
      <MainMap>
        <div className="position-absolute ms-4" style={{ zIndex: 1 }}>
          <Search />
          <InfoPanel />
        </div>
        <MainMenuPanel />
        <ChangeBaseLayer />
      </MainMap>
    </div>
  );
};

export default App;
