import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

/**
 * We need a country boundary geoJson data source to identify the country names/codes from given coordinates
 *
 * @returns `{UseQueryResult}`
 *
 * Source: https://datahub.io/core/geo-countries
 */


export const useGeoCountriesQuery = () => {
  return useQuery({
    queryKey: ['geoCountries'],
    queryFn: () => axios.get('https://datahub.io/core/geo-countries/r/0.geojson').then((response: any) => {
      return response.data
    }),
  })
}