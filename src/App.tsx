import React from 'react';
import MainMap from './components/MainMap';
import SearchInput from './components/search/SearchInput';

function App() {
  return (
    <div className="App">
      <h1>Norgeskart</h1>
      <SearchInput />
      <MainMap />
    </div>
  );
}

export default App;
