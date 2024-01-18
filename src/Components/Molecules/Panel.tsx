import { ReactNode } from 'react'
import styled from 'styled-components'


const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`

interface PanelProps {
  children: ReactNode
}

const Panel = ({children}: PanelProps) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

export default Panel