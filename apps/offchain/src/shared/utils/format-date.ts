import { format } from 'date-fns'

export const formatDate = (timeframe: number, isLong = true) =>
  format(timeframe, isLong ? 'dd.MM.yyyy HH:mm' : 'MMM d, yyyy')
