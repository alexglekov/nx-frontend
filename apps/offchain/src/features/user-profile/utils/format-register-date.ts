import { format } from 'date-fns'

export const formatRegisterDate = (date: number): string => {
  const parsedDate = new Date(date)
  return format(parsedDate, 'MMMM dd, yyyy')
}
