import { ReactNode } from 'react'
import styled from 'styled-components'

interface ContainerProps {
  $gridRow?: string
  $gridColumn?: string
}

const Container = styled.div<ContainerProps>`
  min-height: 0;
  ${props => props.$gridRow && `grid-row: ${props.$gridRow};`}
  ${props => props.$gridColumn && `grid-column: ${props.$gridColumn};`}
`

interface GridItemProps {
  children: ReactNode
  gridRow?: string
  gridColumn?: string
}

const GridItem = ({children, gridRow, gridColumn}: GridItemProps) => {
  return (
    <Container
      $gridRow={gridRow}
      $gridColumn={gridColumn}>
      {children}
    </Container>
  )
}

export default GridItem