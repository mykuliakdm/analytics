import { format } from 'date-fns'

export const getDate = (timestamp: number) => {
  const date = new Date(timestamp)

  return format(date, 'dd/MM/yyyy HH:mm')
}
