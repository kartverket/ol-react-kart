import React from 'react';
import ChangeBaseLayer from './components/change-base-layer/ChangeBaseLayer';
import MainMenuPanel from './components/main-menu-panel/MainMenuPanel';
import MainMap from './components/MainMap';

function App() {
  return (
    <div className="App">
      <MainMap />
      <MainMenuPanel/>
      <ChangeBaseLayer />
    </div>
  );
}

export default App;
