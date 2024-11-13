import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getAPI } from '@/utils/fetching/getAPI'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Skeleton } from '@/components/ui/skeleton'

const chartConfig = {
  value: {
    label: 'Elements:',
  },
} satisfies ChartConfig

type dataProps = {
  element: string
  count: number
}

const PopularElements = () => {
  const { id } = useParams()
  const [data, setData] = useState<dataProps[]>([])
  const [length, setLength] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        if (isMounted) {
          const { data } = await getAPI(`/api/analytics/events/${id}/all`)

          setLength(data.length)

          const groupedByElementType = data.reduce(
            (acc: { [key: string]: number }, item: { element: string }) => {
              const element = item.element
              if (!acc[element]) {
                acc[element] = 0
              }
              acc[element] += 1
              return acc
            },
            {},
          )

          const resultArray = Object.entries(groupedByElementType).map(
            ([element, count]) => ({
              element: element.toLowerCase(),
              count: count as number,
            }),
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
  }, [id])

  return (
    <div className="w-[360px] min-w-[360px] pl-4">
      {isLoading ? (
        <Skeleton className="w-full h-[300px] rounded-lg mb-2" />
      ) : (
        <>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight flex items-center">
            Popular elements
          </h4>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart accessibilityLayer data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="element"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="#1e3a8a" radius={4} />
            </BarChart>
          </ChartContainer>
        </>
      )}
    </div>
  )
}

export default PopularElements
