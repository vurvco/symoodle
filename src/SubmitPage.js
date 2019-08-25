import React, { useState } from 'react'
import Webcam from 'react-webcam'

import Grid from './Grid/Grid'
import { PageLayout, ContentSpace, ControlBar } from './PageLayout'
import Button from './ui-elements/Button'
import IconButton from './ui-elements/IconButton'

import { ReactComponent as Camera } from './icons/camera.svg'
import { ReactComponent as Flip } from './icons/flip.svg'
import { ReactComponent as Anchor } from './icons/anchor.svg'

import './SubmitPage.css'

export default function SubmitPage({ goToClues, handleClueSubmit }) {
  const [camera, setCamera] = useState(false)
  const [cameraIndex, setCameraIndex] = useState(0)
  const [cameraOptions, setCameraOptions] = useState([])
  const [cameraError, setCameraError] = useState(false)

  const [resetGrid, setResetGrid] = useState(false)
  const [code, setCode] = useState('')

  function onUserMedia() {
    try {
      navigator.mediaDevices.enumerateDevices()
        .then(devices => devices.filter(d => d.kind === 'videoinput'))
        .then(setCameraOptions)
    } catch (err) {
      setCameraError(true)
    }
  }

  function getVideoConstraint() {
    if (!cameraOptions.length) return null

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
          {
            <IconButton handleClick={goToClues}>
              <Anchor />
            </IconButton>
          }
        </div>
        <div>{ /* top-center */ }</div>
        {
          !cameraError ? (
            <div>
              {
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
          ) : (<div></div>)
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
        <div>{ /* bottom-left */ }</div>
        <div>
          <Button handleClick={() => handleSubmitCode()}>
            Submit
          </Button>
        </div>
        <div>{ /* bottom-right */ }</div>
      </ControlBar>
    </PageLayout>
  );
}
