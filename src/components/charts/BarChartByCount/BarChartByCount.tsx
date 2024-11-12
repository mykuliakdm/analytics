import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const chartConfig = {
  value: {
    label: 'Users:',
  },
} satisfies ChartConfig

type BarChartByCountProps = {
  data: unknown[]
  color: string
  dataKey: string
}

const BarChartByCount = ({ data, dataKey, color }: BarChartByCountProps) => {
  return (
    <ChartContainer config={chartConfig} className="h-[360px] w-[500px]">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={dataKey}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="value" fill={color} radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

export default BarChartByCount
