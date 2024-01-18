import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGeoCountriesQuery = () => {
  return useQuery({
    queryKey: ['geoCountries'],
    queryFn: () => axios.get('https://datahub.io/core/geo-countries/r/0.geojson').then((response: any) => {
      return response.data
    }),
  })
}