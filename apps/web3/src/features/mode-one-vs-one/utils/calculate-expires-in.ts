import { format } from 'date-fns'
import { MS_IN_SEC } from 'shared/constants'
import { TIME_ADDITION } from '../constants'

export const calculateExpiresIn = (timeframe: number) => {
  const currentUnixTime = Math.floor(Date.now() / MS_IN_SEC)
  const newUnixTime = currentUnixTime + timeframe + TIME_ADDITION
  const newDate = new Date(newUnixTime * MS_IN_SEC)

  const formattedDate = format(newDate, 'dd.MM.yyyy')
  const formattedTime = format(newDate, 'HH:mm')

  return {
    formattedDate,
    formattedTime
  }
}
