import { useMemo } from 'react'
import WorldMap from 'react-svg-worldmap'
import { ICustomer } from '@/utils/types'
import BarChartByCount from '@/components/charts/BarChartByCount/BarChartByCount'
import { PieChart, Pie } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const chartConfig = {
  value: {
    label: 'Sessions:',
  },
} satisfies ChartConfig

type CityProps = {
  city: string
  value: number
  country: string
  coordinates: { lat: string; lon: string }
}

type CountryProps = {
  value: number
  country: string
  countryName: string
}

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

  const groupByCity = useMemo(() => {
    const byCity = data.reduce(
      (
        acc: {
          [key: string]: {
            city: string
            count: number
            country: string
            coordinates: { lat: string; lon: string }
          }
        },
        item: ICustomer,
      ) => {
        const city = item.details?.city ? item.details.city : ''
        const country = item.details?.country || ''
        const coordinates =
          item.details?.lat && item.details?.lon
            ? { lat: item.details?.lat, lon: item.details?.lon }
            : { lat: '', lon: '' }

        if (!acc[city]) {
          acc[city] = { city, count: 0, country, coordinates }
        }
        acc[city].count += 1
        return acc
      },
      {},
    )

    return Object.entries(byCity).map(([city, value]) => ({
      city,
      value: value.count,
      country: value.country,
      coordinates: value.coordinates,
    }))
  }, [data])

  const countSession = useMemo(() => {
    return data.reduce(
      (acc: { referral: number; direct: number }, item: ICustomer) => {
        if (item.session?.referral) {
          acc.referral += 1
        }
        if (item.session?.direct) {
          acc.direct += 1
        }
        return acc
      },
      { referral: 0, direct: 0 },
    )
  }, [data])

  return (
    <div className="py-5">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-2">
        Users by country
      </h4>
      <div className="flex gap-x-4">
        <div className="relative rounded-lg border p-4 bg-background text-foreground">
          <div className="h-[360px]">
            <WorldMap
              color="#1e3a8a"
              value-suffix="people"
              size="lg"
              data={groupByCountry}
            />
          </div>
        </div>
        <div className="relative rounded-lg border p-4 bg-background text-foreground">
          <BarChartByCount
            data={groupByCountry as CountryProps[]}
            dataKey="countryName"
            color="#1e3a8a"
          />
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
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-2 mt-8">
        Users by city
      </h4>
      <div className="flex gap-x-4">
        <div className="relative w-full rounded-lg border p-4 bg-background text-foreground">
          <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
            {groupByCity.map((item) => (
              <li className="py-2" key={item.city}>
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      {item.city}{' '}
                      <span className="text-gray-500">({item.country})</span>
                    </p>
                  </div>
                  <div className="inline-flex items-center text-sm font-semibold">
                    {item.value}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative rounded-lg border p-4 bg-background text-foreground">
          <BarChartByCount
            data={groupByCity as CityProps[]}
            dataKey="city"
            color="#2563eb"
          />
        </div>
        <div className="relative w-full rounded-lg border p-4 bg-background text-foreground">
          <h3 className="scroll-m-20 text-lg font-semibold tracking-tight mb-4">
            Sessions
          </h3>
          <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-2">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-1 min-w-0">
                  <p className="text-sm">Direct</p>
                </div>
                <div className="inline-flex items-center text-sm font-semibold">
                  {countSession.direct}
                </div>
              </div>
            </li>
            <li className="py-2">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-1 min-w-0">
                  <p className="text-sm">Referral</p>
                </div>
                <div className="inline-flex items-center text-sm font-semibold">
                  {countSession.referral}
                </div>
              </div>
            </li>
          </ul>
          <div className="">
            <ChartContainer
              config={chartConfig}
              className="h-[200px] w-[400px] mt-8"
            >
              <PieChart accessibilityLayer>
                <Pie
                  dataKey="value"
                  data={[
                    { name: 'Referral', value: countSession.referral },
                    { name: 'Direct', value: countSession.direct },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  fill="#1e3a8a"
                  label
                  isAnimationActive
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrafficTable
