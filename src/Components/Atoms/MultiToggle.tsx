import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background: #fff;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  height: calc(100% - 4px);
  padding: 2px 11px 2px 11px;
  cursor: pointer;
  margin-top: 4px;
`

const OpenCloseGraphicsContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: calc(50% - 4px);
  width: 46px;
  margin: 4px 0 4px -5px;
  cursor: pointer;
`

interface OpenCloseProps {
  $isSelected?: boolean
}

const Open = styled.div<OpenCloseProps>`
  height: 10px;
  line-height: 10px;
  font-size: ${props => props.$isSelected ? '10px' : '8px'};
  color: ${props => props.$isSelected ? '#000' : '#00000080'};
  margin: 0 0 0 2px;
  user-select: none;
  
`

const Close = styled.div<OpenCloseProps>`
  height: 10px;
  line-height: 10px;
  font-size: ${props => props.$isSelected ? '10px' : '8px'};
  color: ${props => props.$isSelected ? '#000' : '#00000080'};
  margin: 0 2px 0 0;
  user-select: none;
`

interface OpenCloseGraphicsProps {
  setFn: (index: number) => void
  isOpen: boolean
  options?: string[]
}

const OpenCloseGraphics = ({isOpen, setFn, options}: OpenCloseGraphicsProps) => {

  const labels = options && options.length >= 2 ? options : ['On', 'Off']

  return (
    <OpenCloseGraphicsContainer>
      <Close $isSelected={!isOpen} onClick={() => setFn(0)}>
        {labels[0]}
      </Close>
      <Open $isSelected={isOpen} onClick={() => setFn(1)}>
        {labels[1]}
      </Open>
    </OpenCloseGraphicsContainer>
  )
}

const HorizontalTrack = styled.div`
  background: #ccc;
  border-radius: 8px;
  width: 100%;
  height: 7px;
  cursor: pointer;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1);
`

interface TrackThumbProps {
  $marginLeft: number
}

const TrackThumb = styled.div<TrackThumbProps>`
  position: relative;
  border-radius: 50%;
  width: 7px;
  height: 7px;
  background: #BE0000;
  margin-left: ${props => props.$marginLeft}px;
  transition: margin-left 0.5s;
`

interface MultiToggleProps {
  position: number
  setFn: (index: number) => void
  toggleFn: (index: number) => void
  options: string[]
}

const MultiToggle = ({ position, setFn, toggleFn, options }: MultiToggleProps) => {
  const maxPosition = options.length - 1
  const [toggleDirection, setToggleDirection] = useState(position === maxPosition ? -1 : 1)

  const handleTrackClick = () => {
    if ((position + toggleDirection) >= maxPosition) {
      setToggleDirection(-1)
    } else if ((position + toggleDirection) <= 0) {
      setToggleDirection(1)
    }
    toggleFn(position + toggleDirection)
  }

  const thumbMarginLeft = position * (41 - 7) / (options.length - 1)

  return (
    <Container onClick={handleTrackClick}>
      <OpenCloseGraphics isOpen={position === 1} setFn={setFn} options={options}/>
      <HorizontalTrack onClick={handleTrackClick}>
        <TrackThumb $marginLeft={thumbMarginLeft}/>
      </HorizontalTrack>
    </Container>
  )
}

export default MultiToggle