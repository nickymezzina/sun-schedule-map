import Header from './Components/Organisms/Header.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Grid from './Components/Molecules/Grid.tsx'
import GridItem from './Components/Molecules/GridItem.tsx'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapViewer from './Components/Organisms/MapViewer.tsx'
import styled from 'styled-components'
import Panel from './Components/Molecules/Panel.tsx'
import { TimeContextProvider } from './Services/Contexts/TimeContext.tsx'

const queryClient = new QueryClient()

const Container = styled.div`
  position: relative;
  height: 100%;
  background: #ccc;
  padding: 0 5px 5px 5px;
`

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <TimeContextProvider>
      <Container>
        <Header/>
        <Grid gridTemplateColumns={'150px 2fr'} backgroundColor={'#ccc'}>
          <GridItem gridColumn={'1 / 3'}>
            <Panel>
              <MapViewer/>
            </Panel>
          </GridItem>
        </Grid>
      </Container>
    </TimeContextProvider>
    </QueryClientProvider>
  )
}

export default App
