import React, { useState, useEffect } from 'react'
import Webcam from 'react-webcam'

import { PageLayout, ContentSpace, ControlBar } from './PageLayout'
import Button from './ui-elements/Button'
import IconButton from './ui-elements/IconButton'

import { ReactComponent as Camera } from './icons/camera.svg'
import { ReactComponent as Flip } from './icons/flip.svg'
import { ReactComponent as Anchor } from './icons/anchor.svg'

function setDeviceId(deviceId, constraints) {
  constraints = constraints || {}

  constraints.deviceId = {
    exact: deviceId
  }

  return constraints
}

export default function SubmitPage({ goToClues, handleClueSubmit }) {
  const [camera, setCamera] = useState(false)
  const [cameraFlipped, setCameraFlipped] = useState(false)
  const [cameraOptions, setCameraOptions] = useState(null)

  const [in1, setIn1] = useState('')
  const [in2, setIn2] = useState('')
  const [in3, setIn3] = useState('')

  useEffect(() => {
    if(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices()
        .then(devices => devices.filter(d => d.kind === 'videoinput'))
        .then(setCameraOptions)
    }
  }, [])

  return (
    <PageLayout>
      {
        camera && !cameraFlipped && (
          <div className="video-container">
            <Webcam audio={false} videoConstraints={setDeviceId(cameraOptions[0].deviceId)} />
          </div>
        )
      }

      {
        camera && cameraFlipped && (
          <div className="video-container">
            <Webcam audio={false} videoConstraints={setDeviceId(cameraOptions[1].deviceId)} />
          </div>
        )
      }

      <ControlBar>
        <div>
          {
            <IconButton handleClick={goToClues}>
              <Anchor />
            </IconButton>
          }
        </div>
        <div>{ /* top-center */ }</div>
        {
          cameraOptions ? (
            <div>
              {
                camera && cameraOptions.length > 1 && (
                  <IconButton selected={cameraFlipped} handleClick={() => setCameraFlipped(!cameraFlipped)}>
                    <Flip />
                  </IconButton>
                )
              }
              <IconButton selected={camera} handleClick={() => setCamera(!camera)}>
                <Camera />
              </IconButton>
            </div>
          ) : <div></div>
        }
      </ControlBar>

      <ContentSpace>
        <input value={in1} onChange={e => setIn1(e.target.value)} className="temp-input" />
        <input value={in2} onChange={e => setIn2(e.target.value)} className="temp-input" />
        <input value={in3} onChange={e => setIn3(e.target.value)} className="temp-input" />
      </ContentSpace>

      <ControlBar>
        <div>{ /* bottom-left */ }</div>
        <div>
          <Button handleClick={() => handleClueSubmit([in1, in2, in3])}>
            Submit
          </Button>
        </div>
        <div>{ /* bottom-right */ }</div>
      </ControlBar>
    </PageLayout>
  );
}
