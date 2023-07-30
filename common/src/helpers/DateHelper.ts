import { format } from 'date-fns'

export const formatISODateTime = (date: Date) => {
  return format(date, 'yyyy-MM-dd hh:mm:ss')
}
