import { Coordinates } from './Coordinates.ts'
import { Country } from './Country.ts'

export interface MapLocation extends Coordinates {
  id: string
  hideOnMap?: boolean
  country?: Country
}