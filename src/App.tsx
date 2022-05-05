import React from 'react';
import ChangeBaseLayer from './components/change-base-layer/ChangeBaseLayer';
import MainMap from './components/MainMap';

function App() {
  return (
    <div className="App">
      <MainMap />
      <ChangeBaseLayer />
    </div>
  );
}

export default App;
