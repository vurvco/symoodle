import { useState, useEffect } from 'react'

export default function useVideoStream() {
  const [cameraOptions, setCameraOptions] = useState(null)

  useEffect(() => {
    if(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices()
        .then(devices => devices.filter(d => d.kind === 'videoinput'))
        .then(setCameraOptions)
    }
  }, [])

  return cameraOptions
}