import { create } from 'zustand'
import { Coordinates } from '../../Types/Coordinates.ts'
import { SunSchedule } from '../../Types/SunSchedule.ts'
import { MapLocation } from '../../Types/MapLocation.ts'


/** Zustand state management hook: useMapStore
 * useMapStore is a custom hook that provides state management for the map component
 * @returns {MapStore} - The current state and actions for the map component
 * @example
 * const { targetLocations, addTargetLocation, setHideOnMap, reset } = useMapStore()
 *  //or...
 * const sunSchedules = useMapStore((state: any) => state.sunSchedules)
 * const addSunSchedule = useMapStore((state: any) => state.addSunSchedule)
 *
 */

const initialState = {
  targetLocations: [] as MapLocation[],
  sunSchedules: [] as SunSchedule[],
}

export const useMapStore = create((set, get) => ({
  ...initialState,
  addTargetLocation: (targetLocation: Coordinates) => {
    const currentState = get() as any
    const targetLocations = currentState.targetLocations as Coordinates[]
   set({targetLocations: [...targetLocations, targetLocation]})
  },
  addSunSchedule: (sunSchedule: SunSchedule) => {
    const currentState = get() as any
    const sunSchedules = currentState.sunSchedules as SunSchedule[]
    const existingSunSchedule = sunSchedules.find((existingSunSchedule: any) => existingSunSchedule.id === sunSchedule.id)
    if (existingSunSchedule) {
      const index = sunSchedules.indexOf(existingSunSchedule)
      sunSchedules[index] = sunSchedule
    } else {
      sunSchedules.push(sunSchedule)
    }
    set({sunSchedules: [...sunSchedules]})
  },
  setHideOnMap: (id: string, hideOnMap: boolean) => {
    const currentState = get() as any
    const sunSchedules = currentState.sunSchedules as SunSchedule[]
    const sunSchedule = sunSchedules.find((sunSchedule: any) => sunSchedule.id === id)
    if (!sunSchedule) return
    sunSchedule.hideOnMap = hideOnMap
    set({sunSchedules: [...sunSchedules]})
  },
  reset() {
    set({ targetLocations: [], sunSchedules: [] })
  }
}))