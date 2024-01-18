import { Coordinates } from './Coordinates.ts'

export interface SunSchedule {
  id: string
  coordinates: Coordinates
  sunrise: string
  sunset: string
  dayLength: string
  hideOnMap?: boolean
}