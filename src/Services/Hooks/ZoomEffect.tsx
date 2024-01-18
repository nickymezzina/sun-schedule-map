import { useEffect, useState } from 'react'

/**
 * A hook that returns the current zoom level of the window.
 *
 * @return {number} The current zoom level of the window.
 */

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