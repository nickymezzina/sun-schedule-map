import { ReactNode } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;

  max-height: 200px;
  width: 170px;

  overflow-y: hidden;

  & > div {
    background-color: #ffffffc7;
    max-height: 200px;
    overflow: hidden;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    transition: background-color 0.2s ease-in-out;
  }

  &:hover > div {
    background-color: #ffffff;
  }
`

interface CustomMapControlProps {
  children: ReactNode
}

const CustomMapControl = ({children}: CustomMapControlProps) => {

  return(
<Container>
  {children}
</Container>
)
}

export default CustomMapControl