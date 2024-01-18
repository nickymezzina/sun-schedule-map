import { useEffect, useState } from 'react'

export const useZoomEffect = () => {
  const [currentZoomLevel, setCurrentZoomLevel] = useState<number>(1)
  useEffect(() => {
    const getZoomLevel = () => {
      const zoomLevel = window.devicePixelRatio
      setCurrentZoomLevel(zoomLevel)
    }
    window.addEventListener('resize', getZoomLevel)
    getZoomLevel()
    return () => window.removeEventListener('resize', getZoomLevel)
  })

  return currentZoomLevel
}