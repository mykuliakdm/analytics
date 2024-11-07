import axios from 'axios'
import { DateRange } from 'react-day-picker'

export const getAPI = async (
  url: string,
  params?: { [key: string]: string | number | DateRange | undefined },
) => {
  const response = await axios.get(url, { params })
  return response.data
}
