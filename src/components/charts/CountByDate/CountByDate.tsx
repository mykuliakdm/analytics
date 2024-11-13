import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import { format } from 'date-fns'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useEffect, useState } from 'react'
import { getAPI } from '@/utils/fetching/getAPI'
import { useParams } from 'next/navigation'
import { dataTypeProps } from '@/utils/types'
import { Loader2 } from 'lucide-react'

const chartConfig: ChartConfig = {
  count: {
    label: 'Amount: ',
  },
} satisfies ChartConfig

type dataProps = {
  date: string
  count: number
}

type CountByDateProps = {
  dataType: dataTypeProps
}

const titles = {
  visits: 'Visits',
  events: 'Events',
  navigation: 'Navigations made',
  traffic: 'Users',
} as { [key: string]: string }

const CountByDate = ({ dataType = 'visits' }: CountByDateProps) => {
  const { id } = useParams()
  const [data, setData] = useState<dataProps[]>([])
  const [length, setLength] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        if (isMounted) {
          const { data } = await getAPI(`/api/analytics/${dataType}/${id}/all`)

          setLength(data.length)

          const groupedByDate = data.reduce(
            (acc: { [key: string]: number }, item: { createdAt: string }) => {
              const date = format(new Date(item.createdAt), 'dd/MM/yyyy')
              if (!acc[date]) {
                acc[date] = 0
              }
              acc[date] += 1
              return acc
            },
            {},
          )

          const resultArray = Object.entries(groupedByDate)
            .map(([date, count]) => ({
              date,
              count: count as number,
            }))
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
            )

          setData(resultArray)
        }
      } catch (error) {
        console.error('Failed to fetch data ', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [dataType, id])

  return (
    <div className="w-full">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight flex items-center">
        Total number of {titles[dataType]}:{' '}
        {isLoading ? <Loader2 className="w-6 h-6 animate-spin ml-2" /> : length}
      </h4>
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <LineChart accessibilityLayer data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickLine={false} />
          <YAxis dataKey="count" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="count" />
        </LineChart>
      </ChartContainer>
    </div>
  )
}

export default CountByDate
