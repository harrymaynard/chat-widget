import { format, parseISO } from 'date-fns'

export const formatISODateTime = (date: Date | string) => {
  if (typeof date === 'string') {
    date = parseISO(date)
  }
  return format(date, 'yyyy-MM-dd hh:mm:ss')
}
