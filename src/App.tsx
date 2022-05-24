import React from 'react';
import ChangeBaseLayer from './components/change-base-layer/ChangeBaseLayer';
import MainMap from './components/MainMap';
import MapTest from './components/MapTest';
import Logo from './components/Logo';
// import SearchInput from './components/search/SearchInput';

function App() {
  return (
    <div className="App">
      <MainMap />
      <ChangeBaseLayer />
    </div>
  );
}

export default App;
