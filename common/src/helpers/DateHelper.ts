import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'

export const formatISODateTime = (date: Date | string) => {
  if (typeof date === 'string') {
    date = parseISO(date)
  }
  return format(date, 'yyyy-MM-dd hh:mm:ss')
}
