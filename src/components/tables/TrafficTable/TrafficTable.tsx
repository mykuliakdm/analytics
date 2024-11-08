import { useMemo } from 'react'
import WorldMap from 'react-svg-worldmap'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { ICustomer } from '@/utils/types'

const chartConfig = {
  value: {
    label: 'Users:',
  },
} satisfies ChartConfig

const TrafficTable = ({ data }: { data: ICustomer[] }) => {
  const groupByCountry = useMemo(() => {
    const byCountry = data.reduce(
      (
        acc: { [key: string]: { country: string; count: number } },
        item: ICustomer,
      ) => {
        const countryCode = item.details?.countryCode
          ? item.details.countryCode
          : ''
        const countryName = item.details?.country || ''

        if (!acc[countryCode]) {
          acc[countryCode] = { country: countryName, count: 0 }
        }
        acc[countryCode].count += 1
        return acc
      },
      {},
    )

    return Object.entries(byCountry).map(([countryCode, value]) => ({
      country: countryCode.toLowerCase(),
      value: value.count,
      countryName: value.country,
    }))
  }, [data])
  console.log(groupByCountry)
  return (
    <div className="py-5">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-2">
        Users by country
      </h4>
      <div className="flex gap-x-4">
        <div className="relative rounded-lg border p-4 bg-background text-foreground">
          <div className="h-[360px]">
            <WorldMap
              color="blue"
              value-suffix="people"
              size="lg"
              data={groupByCountry}
            />
          </div>
        </div>
        <div className="relative rounded-lg border p-4 bg-background text-foreground">
          <ChartContainer config={chartConfig} className="h-[360px] w-[500px]">
            <BarChart accessibilityLayer data={groupByCountry}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="countryName"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 10)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="blue" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
        <div className="relative w-full rounded-lg border p-4 bg-background text-foreground">
          <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
            {groupByCountry.map((item) => (
              <li className="py-2" key={item.country}>
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{item.countryName}</p>
                  </div>
                  <div className="inline-flex items-center text-sm font-semibold">
                    {item.value}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TrafficTable
