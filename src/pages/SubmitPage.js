import React, { useState } from 'react'
import Webcam from 'react-webcam'

import Grid from '../grid/Grid'
import { PageLayout, ContentSpace, ControlBar } from './PageLayout'
import Button from '../ui-elements/Button'
import IconButton from '../ui-elements/IconButton'

import { ReactComponent as Camera } from '../icons/camera.svg'
import { ReactComponent as Flip } from '../icons/flip.svg'
import { ReactComponent as Anchor } from '../icons/anchor.svg'

import './SubmitPage.css'

/*
 * Page to submit code
 * handles video logic and wraps the p5 grid
 */
export default function SubmitPage({ goToClues, handleClueSubmit }) {
  // Camera state
  const [camera, setCamera] = useState(false)
  const [cameraIndex, setCameraIndex] = useState(0)
  const [cameraOptions, setCameraOptions] = useState([])
  const [cameraError, setCameraError] = useState(false)

  // Grid state
  const [resetGrid, setResetGrid] = useState(false)
  const [code, setCode] = useState('')

  // Apple only lets us grab enumeratedDevices
  // when the use has already agreed to give access
  // so we call this after react-camera has had success
  function onUserMedia() {
    try {
      // Grab the different device cameras
      navigator.mediaDevices.enumerateDevices()
        .then(devices => devices.filter(d => d.kind === 'videoinput'))
        .then(setCameraOptions)
    } catch (err) {
      setCameraError(true)
    }
  }

  function getVideoConstraint() {
    if (!cameraOptions.length) return null

    // Use the camera at cameraIndex
    return { 
      deviceId: { 
        exact: cameraOptions[cameraIndex].deviceId
      }
    }
  }

  function handleSubmitCode() {
    setResetGrid(true)
    handleClueSubmit(code)
  }

  return (
    <PageLayout>
      {
        // react-webcam component
        camera && (
          <div className="video-container">
            <Webcam audio={false}
              videoConstraints={getVideoConstraint()}
              onUserMedia={onUserMedia} />
          </div>
        )
      }

      <ControlBar>
        <div>
          <IconButton handleClick={goToClues}>
            <Anchor />
          </IconButton>
        </div>
        <div>{ /* top-center of control bar */ }</div>
        {
          // If no cameraError, show the enable camera button
          !cameraError ? (
            <div>
              {
                // If the camera is showing, and there are more than one camera option
                // give users the ability to switch between cameras
                camera && cameraOptions.length > 1 && (
                  <IconButton selected={true}
                    handleClick={() => setCameraIndex((cameraIndex + 1) % cameraOptions.length)}>
                    <Flip />
                  </IconButton>
                )
              }
              <IconButton selected={camera} handleClick={() => setCamera(!camera)}>
                <Camera />
              </IconButton>
            </div>
          ) : (<div>{ /* top-right of control bar */ }</div>)
        }
      </ControlBar>

      <ContentSpace>
        <div className="grid-wrapper">
          <Grid camera={camera}
            resetGrid={resetGrid}
            setResetGrid={setResetGrid}
            setCode={setCode} />
        </div>
      </ContentSpace>

      <ControlBar>
        <div>{ /* bottom-left of control bar */ }</div>
        <div>
          <Button handleClick={() => handleSubmitCode()}>
            Submit
          </Button>
        </div>
        <div>{ /* bottom-right of control bar */ }</div>
      </ControlBar>
    </PageLayout>
  );
}
