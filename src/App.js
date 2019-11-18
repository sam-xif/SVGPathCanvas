import React from 'react';
import './App.css';
import OverlayImage from './components/OverlayImage'
import PathCanvas from './components/PathCanvas'

function App() {
  return (
    <div className="App">
      {/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>*/}
      <OverlayImage
        imageComponent={<img src={'image.jpg'} />}
        overlayComponent={<PathCanvas width={500} height={500} pathProps={{stroke: 'red', fill: 'transparent' }} />}
      />
    </div>
  );
}

export default App;
