import styled from 'styled-components'
import { useContext } from 'react'
import { TimeContext } from '../../Services/Contexts/TimeContext.tsx'
import MultiToggle from '../Atoms/MultiToggle.tsx'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  height: 40px;
  margin: -5px;
  padding: 0 20px;
  color: #000;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
`

const Title = styled.div`
  font-size: 1.25em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const TimeSetting = styled.div`
  display: flex;
  align-items: center;
  & > div:first-child {
    font-size: 0.67em;
    margin-top: 2px;
    margin-right: 10px;
  }
`

const ToggleContainer = styled.div`
  height: 33px;
`

const Header = () => {
  const {displayTargetTime, setDisplayTargetTime} = useContext(TimeContext)

  const setFn = (index: number) => {
    setDisplayTargetTime(index === 1)
  }

  const toggleFn = () => {
    setFn(+!displayTargetTime)
  }

  return (
    <Container>
      <Title>The Quest for the Last Sunny Place on Earth</Title>
      <TimeSetting>
        <div>
          Time reference:
        </div>
        <ToggleContainer>
          <MultiToggle
            position={displayTargetTime ? 1 : 0}
            toggleFn={toggleFn}
            setFn={setFn}
            options={['Local', 'Target']}
          />
        </ToggleContainer>
      </TimeSetting>
    </Container>
  )

}

export default Header