import React from 'react';

import MainMap from './components/MainMap';
import ChangeBaseLayer from './components/change-base-layer/ChangeBaseLayer';
import InfoPanel from './components/info-panel/InfoPanel';
import MainMenuPanel from './components/main-menu-panel/MainMenuPanel';
import Search from './components/search/Search';

const App = () => {

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
