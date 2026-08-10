import { format } from 'date-fns'
import { MS_IN_SEC } from 'shared/constants'

export const calculateStartAt = (startAtTimeframe: number) => {
  const startAtDate = new Date(startAtTimeframe * MS_IN_SEC)

  const formattedDate = format(startAtDate, 'dd.MM.yyyy')
  const formattedTime = format(startAtDate, 'HH:mm')

  return {
    formattedDate,
    formattedTime
  }
}
