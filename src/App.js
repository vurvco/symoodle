import React, { useState, useEffect } from 'react'
import Webcam from 'react-webcam'

import { ReactComponent as Camera } from './camera.svg'

import './App.css'

function App() {
  const [camera, setCamera] = useState(false)

  let cameraButtonClass = 'icon-button'
  if (camera) {
    cameraButtonClass = cameraButtonClass + ' icon-button--active'
  }

  console.log(window.innerHeight, window.innerWidth)

  return (
    <div>
      {
        camera && (
          <div className="video-container">
            <Webcam />
          </div>
        )
      }

      <div className="bar bar--top">
        <div>{ /* top-left */ }</div>
        <div>{ /* top-center */ }</div>
        <div>
          <button className={cameraButtonClass} onClick={() => setCamera(!camera)}>
            <Camera />
          </button>
        </div>
      </div>

      <div className="bar bar--bottom">
        <div>{ /* bottom-left */ }</div>
        <div>
          <button className="button" onClick={() => console.log('Submit')}>
            Submit
          </button>
        </div>
        <div>{ /* bottom-right */ }</div>
      </div>
    </div>
  );
}

export default App;
