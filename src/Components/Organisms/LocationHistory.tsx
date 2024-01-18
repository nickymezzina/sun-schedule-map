import { useMapStore } from '../../Services/Stores/MapStore.tsx'
import styled from 'styled-components'
import { SunSchedule } from '../../Types/SunSchedule.ts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

/**
 * Renders a component that displays the previously targeted location history.
 *
 * @return `{JSX.Element}` `The rendered LocationHistory component.
 */

const Container = styled.div`
  height: 100%;
  width: 100%;
`

const ListContainer = styled.div`
  max-height: 150px;
  padding: 5px 8px 5px 5px;
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
  box-shadow: inset 0 0 2px rgba(0,0,0,0.1);
  background-color: #fafafa20;
  border-radius: 2px;

  -ms-overflow-style: none;
  scrollbar-width: auto;
  &::-webkit-scrollbar {
    display: none;
    width: 0;
    background: transparent;
  }
`

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 15px;
  height: 15px;
  border-bottom: 1px solid #ccc;
  margin: 0 5px 5px 5px;
  
  & > div:first-child {
    font-size: 0.8rem;
  }
  
  & > div:nth-child(2) {
    font-size: 0.67rem;
    
    float: right;
    cursor: pointer;
    &:hover {
      color: #7993B2;
    }
  }
`

interface RowProps {
  $isSelected: boolean
}

const Row = styled.div<RowProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 0.67rem;
  border-radius: 4px;
  background: ${props => props.$isSelected ? '#003348' : '#e8e8e4'};
  color: ${props => props.$isSelected ? '#fff' : '#000'};
  padding: 5px;
  user-select: none;
  cursor: pointer;
  border: 1px solid #ccc;
`

export const InfoText = styled.div`
  font-size: 0.67rem;
`
const LocationHistory = () => {
  const reset = useMapStore((state: any) => state.reset)
  const sunSchedules = useMapStore((state: any) => state.sunSchedules)
  const setHideOnMap = useMapStore((state: any) => state.setHideOnMap)

  return (
    <Container>
      <Title>
        <div>History</div>
        {sunSchedules.length > 0 && <div onClick={reset}>Clear</div>}
      </Title>
      <ListContainer>
      {sunSchedules.map((sunSchedule: SunSchedule) => {
        const label = `${sunSchedule.coordinates.lat.toFixed(5)}, ${sunSchedule.coordinates.lng.toFixed(5)}`
        const hideOnMap = sunSchedule.hideOnMap || false
        return <Row key={`location-history-row-${label}`} $isSelected={!hideOnMap}
                    onClick={() => setHideOnMap(sunSchedule.id, !hideOnMap)}>
          <div>
            {label}
          </div>
          <div>
            <FontAwesomeIcon icon={!hideOnMap ? faEye : faEyeSlash} color={!hideOnMap ? '#fff' : '#ccc'}/>
          </div>
        </Row>
      })}
      </ListContainer>
    </Container>
  )
}

export default LocationHistory