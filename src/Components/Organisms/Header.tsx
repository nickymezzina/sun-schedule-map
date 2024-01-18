import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 40px;
  margin: -5px;
  padding: 0 20px;
  font-size: 1.25em;
  color: #000;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Header = () => {

  return (
    <Container>
        The Quest for the Last Sunny Place on Earth
    </Container>
  )

}

export default Header