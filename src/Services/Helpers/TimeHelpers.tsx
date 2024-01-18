
export const toLocal = (date: Date) => {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
}

export const toUtc = (date: Date) => {
  return new Date(date.getTime() + date.getTimezoneOffset() * 60000)
}

export const convertToTargetTime = (time, lat, lng) => {
  // const timezone = find(lat, lng)

  return (time)
}