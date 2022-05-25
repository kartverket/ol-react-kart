import React from 'react';
import ChangeBaseLayer from './components/change-base-layer/ChangeBaseLayer';
import MainMenuPanel from './components/main-menu-panel/MainMenuPanel';
import MainMap from './components/MainMap';
import MapTest from './components/MapTest';
import Logo from './components/Logo';
import Search from './components/search/Search';
// import SearchInput from './components/search/SearchInput';

function App() {
  return (
    <div className="App">
      {/*<MainMap />*/}
      <Search/>
      <MapTest/>
      <MainMenuPanel/>
      <ChangeBaseLayer />
    </div>
  );
}

export default App;
