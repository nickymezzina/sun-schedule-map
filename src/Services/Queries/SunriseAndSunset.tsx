import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Coordinates } from '../../Types/Coordinates.ts'
import { useEffect } from 'react'
import { useMapStore } from '../Stores/MapStore.tsx'

interface SunriseAndSunsetQueryParams {
  targetCoordinates?: Coordinates
}

export const useSunriseAndSunsetQuery = (params: SunriseAndSunsetQueryParams) => {
  const url = `https://api.sunrise-sunset.org/json`
  const addSunSchedule = useMapStore((state: any) => state.addSunSchedule)

  const query = useQuery({
    enabled: !!params.targetCoordinates,
    queryKey: ['sunriseAndSunset', `${params.targetCoordinates?.lat}-${params.targetCoordinates?.lng}`],
    queryFn: () => axios.get(url + `?lat=${params.targetCoordinates?.lat}&lng=${params.targetCoordinates?.lng}`).then((response: any) => {

      return {...response.data, coordinates: params.targetCoordinates}
    })
  })

  useEffect(() => {
    if (query.data) {
      const {sunrise, sunset, day_length} = query.data.results
      const id = `${params.targetCoordinates?.lat}-${params.targetCoordinates?.lng}`
      addSunSchedule({id: id, coordinates: params.targetCoordinates, sunrise, sunset, dayLength: day_length})
    }
  }, [query.data])

  return query
}