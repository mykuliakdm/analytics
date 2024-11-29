import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getAPI } from '@/utils/fetching/getAPI'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import VisitDuration from '@/components/VisitDuration/VisitDuration'

type dataProps = {
  href: string
  data: {
    count: number
    time: number
    pageTitle: string
  }
}

type valueTypeProps = 'count' | 'time'

const MostViewPages = () => {
  const { id } = useParams()
  const [data, setData] = useState<dataProps[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [valueType, setValueType] = useState<valueTypeProps>('count')

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        if (isMounted) {
          const { data = [] } = await getAPI(`/api/analytics/visits/${id}/all`)

          const groupedByCount = data.reduce(
            (
              acc: {
                [key: string]: {
                  count: number
                  time: number
                  pageTitle: string
                }
              },
              item: { href: string; time: number; pageTitle: string },
            ) => {
              const href = item.href
              const time = item.time
              const pageTitle = item.pageTitle

              if (!acc[href]) {
                acc[href] = { count: 0, time, pageTitle }
              }
              acc[href].count += 1
              acc[href].time += time
              return acc
            },
            {},
          )

          const resultArray = Object.entries(groupedByCount).map(
            ([href, value]) => ({
              href,
              data: value as { count: number; time: number; pageTitle: string },
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
    <div className="w-full lg:w-[360px] min-w-[360px] pl-4">
      {isLoading ? (
        <Skeleton className="w-full h-[300px] rounded-lg mb-2" />
      ) : (
        <>
          <div className="flex items-center justify-between gap-x-2">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight flex items-center">
              Top pages
            </h4>
            <div className="flex items-center gap-x-2">
              <span className="text-xs">By:</span>
              <Select onValueChange={(v: valueTypeProps) => setValueType(v)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Amount of views" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="count">Amount of views</SelectItem>
                  <SelectItem value="time">Time of views</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="h-[262px] overflow-y-auto w-full mt-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead className="text-right">{valueType}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data
                  .sort((a, b) => b.data[valueType] - a.data[valueType])
                  .map((item) => (
                    <TableRow key={item.href}>
                      <TableCell className="py-2">
                        {item.data.pageTitle ? item.data.pageTitle : item.href}
                      </TableCell>
                      <TableCell className="py-2 text-right">
                        {valueType === 'time' ? (
                          <VisitDuration time={item.data[valueType]} />
                        ) : (
                          item.data[valueType]
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  )
}

export default MostViewPages
