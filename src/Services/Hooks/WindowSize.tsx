import { useLayoutEffect, useState } from 'react'
import { Dimensions } from '../../Types/Dimensions.ts'

/** Custom hook: useWindowSize
 * useWindowSize listens for resize events on the window and returns the current width and height of the window
 * @returns {Dimensions} - The current width and height of the window
 * @example
 * const { windowSize } = useWindowSize()
 *
 * useEffect(() => {
 *   // desired side effects
 *
 * }, [windowSize])
 */

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<Dimensions | undefined>()
  useLayoutEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }, 10)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  })

  return windowSize
}