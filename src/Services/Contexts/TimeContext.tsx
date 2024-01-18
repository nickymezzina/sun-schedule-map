import { createContext, ReactNode, useState } from 'react'

/**
 * Creates a TimeContextProvider component that wraps its children and provides a time context.
 *
 * @param {TimeContextProviderProps} children - The children components to be wrapped by the TimeContextProvider.
 * @return {JSX.Element} The TimeContextProvider component.
 */

export const TimeContext = createContext({
  displayTargetTime: false,
  setDisplayTargetTime: (_: boolean) => {}
})

interface TimeContextProviderProps {
  children: ReactNode
}

export const TimeContextProvider = ({ children }: TimeContextProviderProps) => {
  const [displayTargetTime, setDisplayTargetTime] = useState(false)

  return (
    <TimeContext.Provider value={{ displayTargetTime, setDisplayTargetTime }}>
      {children}
    </TimeContext.Provider>
  )
}