import { ReactNode } from 'react'
import styled from 'styled-components'

interface GridContainerProps {
  $gridTemplateRows?: string
  $gridTemplateColumns?: string
  $backgroundColor?: string
}

const GridContainer = styled.div<GridContainerProps>`
  display: grid;
  padding-top: 40px;
  grid-template-columns: ${props => props.$gridTemplateColumns && props.$gridTemplateColumns};
  grid-template-rows: ${props => props.$gridTemplateRows && props.$gridTemplateRows};
  grid-gap: 5px;
  height: calc(100vh - 5px);
`

interface GridProps {
  children: ReactNode
  gridTemplateRows?: string
  gridTemplateColumns?: string
  gap?: string
  backgroundColor?: string
}

const Grid = ({children, gridTemplateRows, gridTemplateColumns, backgroundColor}: GridProps) => {
  return (
    <GridContainer
      $gridTemplateRows={gridTemplateRows}
      $gridTemplateColumns={gridTemplateColumns}
      $backgroundColor={backgroundColor}>
      {children}
    </GridContainer>
  )
}

export default Grid