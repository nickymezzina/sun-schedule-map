import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faArrowUp, faArrowDown, faHourglassStart } from '@fortawesome/free-solid-svg-icons'
import Flag from 'react-world-flags'
import { SunSchedule } from '../../Types/SunSchedule.ts'
import { useMapStore } from '../../Services/Stores/MapStore.tsx'
import { MapLocation } from '../../Types/MapLocation.ts'
import { Country } from '../../Types/Country.ts'

const Container = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  font-size: .9em;
`

const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  width: 100%;
  color: #003348;
`

const Close = styled.div`
  cursor: pointer;

  &:hover {
    color: #ccc;
  }
`

const Body = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
`

interface MetricCardProps {
  $backgroundColor: string
  $flex: string
}

const MetricCard = styled.div<MetricCardProps>`
  width: 80px;
  height: 50px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 5px;
  margin: 2px;
  background-color: ${props => props.$backgroundColor};
  flex: ${props => props.$flex};
`

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
`

const TextContainer = styled.div`
  font-size: .9em;
`

interface MapToolTipProps {
  targetLocation: MapLocation
  country?: Country
}


const SunPopup = ({targetLocation}: MapToolTipProps) => {
  const sunSchedules = useMapStore((state: any) => state.sunSchedules)
  const sunSchedule = sunSchedules.find((sunSchedule: SunSchedule) => sunSchedule.id === targetLocation.id)
  const setHideOnMap = useMapStore((state: any) => state.setHideOnMap)
  const label = `[${sunSchedule.coordinates.lat.toFixed(5)}, ${sunSchedule.coordinates.lng.toFixed(5)}]`

  if (!sunSchedule) return null

  return (
    <Container>
      <TitleBar>
        {targetLocation?.country && <div title={targetLocation.country.name}>
            <Flag code={targetLocation.country.code} height="10"/>
        </div>}
        <div>
          {label}
        </div>
        <Close onClick={() => setHideOnMap(sunSchedule.id, true)}>
          Hide
        </Close>
      </TitleBar>
      <Body>
        <MetricCard $flex={'1 1 100px'} $backgroundColor={'#fbab18'}>
          <IconContainer>
            <FontAwesomeIcon icon={faArrowUp}/>
            <FontAwesomeIcon icon={faSun} color={'#fff'}/>
          </IconContainer>
          <TextContainer>{sunSchedule.sunrise}</TextContainer>
        </MetricCard>
        <MetricCard $flex={'1 1 100px'} $backgroundColor={'#003247'}>
          <IconContainer>
            <FontAwesomeIcon icon={faArrowDown}/>
            <FontAwesomeIcon icon={faSun} color={'#fff'}/>
          </IconContainer>
          <TextContainer>{sunSchedule.sunset}</TextContainer>
        </MetricCard>
        <MetricCard $flex={'1 1 100px'} $backgroundColor={'#009bdb'}>
          <IconContainer>
            <FontAwesomeIcon icon={faSun} color={'#fff'}/>
            <FontAwesomeIcon icon={faHourglassStart} className={'fa-regular'}/>
          </IconContainer>
          <TextContainer>{sunSchedule.dayLength}</TextContainer>
        </MetricCard>
      </Body>
    </Container>
  )

}

export default SunPopup