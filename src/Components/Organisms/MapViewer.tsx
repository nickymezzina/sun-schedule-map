import styled from 'styled-components'
import Map, { MapMouseEvent, Marker, Popup, Layer, Source, NavigationControl, MapRef } from 'react-map-gl'
import { useSunriseAndSunsetQuery } from '../../Services/Queries/SunriseAndSunset.tsx'
import { useMapStore } from '../../Services/Stores/MapStore.tsx'
import { useEffect, useRef, useState } from 'react'
import SunPopup from '../Molecules/SunPopup.tsx'
import { MapLocation } from '../../Types/MapLocation.ts'
import { useGeoCountriesQuery } from '../../Services/Queries/GeoCountries.tsx'
import Panel from '../Molecules/Panel.tsx'
import LocationHistory, { InfoText } from './LocationHistory.tsx'
import LoadingSpinner from '../Atoms/LoadingSpinner.tsx'

/**
 * The main map component and implementation of Mapbox GL using the react-mapbox-gl wrapper (to keep the look and structure of React Functional Components)
 * @return `{JSX.Element}` The map viewer component.
 */

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const HistoryContainer = styled.div`
  position: absolute;

  width: 170px;
  top: 60px;
  left: 25px;

  max-height: 200px;
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

const MapLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`

const MapViewer = () => {
  const [viewState, setViewState] = useState({
    longitude: 6.129419285067968,
    latitude: 49.6042874715628,
    zoom: 17,
  })

  const ref = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MapRef>(null)

  const [doSpin, setDoSpin] = useState(false)

  const targetLocations = useMapStore((state: any) => state.targetLocations)
  const addTargetLocation = useMapStore((state: any) => state.addTargetLocation)
  const sunSchedules = useMapStore((state: any) => state.sunSchedules)

  const lastTargetLocation = targetLocations[targetLocations.length - 1]

  const {data: sunData, isSuccess} = useSunriseAndSunsetQuery({targetCoordinates: lastTargetLocation})
  const {data: countriesData, isLoading: isCountriesLoading} = useGeoCountriesQuery()

  const handleClickMap = (event: MapMouseEvent) => {
    if (!mapRef.current) return

    const map = mapRef.current.getMap()

    const features = map.queryRenderedFeatures(event.point)

    if (!features[0]) return

    const country = {
      name: features[0].properties?.ADMIN,
      code: features[0].properties?.ISO_A3,
    }

    const [lat, lng] = [event.lngLat.lat, event.lngLat.lng]
    const id = `${lat}-${lng}`

    addTargetLocation({
      id,
      lat,
      lng,
      country: country,
    })
    setDoSpin(true)
  }

  useEffect(() => {
    if (sunSchedules.length > 0) {
      if (sunSchedules.some((sunSchedule: any) => sunSchedule.id === lastTargetLocation.id)) {
        setDoSpin(false)
      }
    }
  },[sunSchedules, lastTargetLocation, doSpin])

  useEffect(() => {
    if (sunData) {
      if (mapRef.current) {
        const map = mapRef.current.getMap()
        map.easeTo({
          center: [sunData.coordinates.lng, sunData.coordinates.lat],
          essential: true,
        })
      }
    }
  }, [sunData, isSuccess])

  if (isCountriesLoading) return <MapLoading><LoadingSpinner /></MapLoading>

  return (
    <Container ref={ref}>
      <Map
        ref={mapRef}
        mapboxAccessToken={'pk.eyJ1Ijoibmlja3l0aGVodXR0IiwiYSI6ImNsM3cyOTl5bDA1OXQzY25yMGpodW1vbTEifQ.9_9rXamACfIqj4_Gp_YOWA'}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        onClick={handleClickMap}>
        <Source id="countries"
                type="geojson"
                data={countriesData}>
          <Layer
            id={'layer-countries'}
            type={'fill'}
            source={'countries'}
            paint={{
              'fill-color': '#ffffff',
              'fill-opacity': 0,
            }}
          />
        </Source>
        {!!lastTargetLocation && doSpin &&
            <Marker
                longitude={lastTargetLocation.lng}
                latitude={lastTargetLocation.lat}
                draggable={false}
                anchor={'bottom'}>
              <LoadingSpinner color={'#e8e8e4'} fontSize={'1.5rem'} />
            </Marker>
        }
        {targetLocations.map((targetLocation: MapLocation, index: number) => {
          const sunSchedule = sunSchedules.find((sunSchedule: any) => sunSchedule.id === targetLocation.id)
          if (sunSchedule && !sunSchedule.hideOnMap) {
            return (
              <Popup
                key={index}
                longitude={targetLocation.lng}
                latitude={targetLocation.lat}
                closeButton={false}
                closeOnClick={false}
                anchor={'bottom'}
                offset={[0, -10] as any}
              >
                <SunPopup targetLocation={targetLocation}/>
              </Popup>
            )
          }
        })}
        <NavigationControl showCompass={false}/>
      </Map>
      <HistoryContainer>
        <Panel>
          {sunSchedules.length > 0 ? <LocationHistory /> :
            <InfoText>Click on some land to check how much sun there is during a day</InfoText>}
        </Panel>
      </HistoryContainer>
    </Container>
  )
}

export default MapViewer