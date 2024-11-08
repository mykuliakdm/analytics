'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import AlertInfo from '@/components/AlertInfo/AlertInfo'
import { dataTypeProps, ICustomer, IEvent, IMeta, IVisit } from '@/utils/types'
import { PAGINATION } from '@/config/constants'
import Pagination from '@/components/Pagination/Pagination'
import { getAPI } from '@/utils/fetching/getAPI'
import TableActions from '@/components/TableActions/TableActions'
import DateFilter from '@/components/DateFilter/DateFilter'
import { DateRange } from 'react-day-picker'
import VisitsTable from '@/components/tables/VisitsTable/VisitsTable'
import EventsTable from '@/components/tables/EventsTable/EventsTable'
import NavigationTable from '@/components/tables/NavigationTable/NavigationTable'
import generatePDF, { Resolution, Margin, Options } from 'react-to-pdf'
import { format } from 'date-fns'

const CountByDate = dynamic(
  async () => import('@/components/charts/CountByDate/CountByDate'),
  { ssr: false },
)
const TrafficTable = dynamic(
  async () => import('@/components/tables/TrafficTable/TrafficTable'),
  { ssr: false },
)

type AnalyticsProps = {
  dataType: dataTypeProps
}

const options: Options = {
  filename: `analytics-${format(new Date(), 'dd/MM/yyyy')}.pdf`,
  method: 'open',
  resolution: Resolution.HIGH,
  page: {
    margin: Margin.MEDIUM,
    format: 'A4',
    orientation: 'portrait',
  },
  canvas: {
    mimeType: 'image/jpeg',
    qualityRatio: 1,
  },
  overrides: {
    pdf: {
      compress: true,
    },
    canvas: {
      useCORS: true,
    },
  },
}

const Analytics = ({ dataType }: AnalyticsProps) => {
  const { id } = useParams()
  const pathname = usePathname()
  const [page, setPage] = useState<number>(
    Number(useSearchParams().get('page')) || 1,
  )
  const [data, setData] = useState([])
  const [meta, setMeta] = useState<IMeta>({ totalCount: 0 })
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [reload, setReload] = useState<boolean>(false)
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
  const [isExporting, setIsExporting] = useState<boolean>(false)

  const targetRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    const fetchData = async () => {
      try {
        if (isMounted) {
          // TODO: fix double fetch on reload
          const { data, meta } = await getAPI(
            `/api/analytics/${dataType}/${id}`,
            {
              page,
              dateRange,
            },
          )
          setData(data)
          setMeta(meta)
        }
      } catch (error) {
        console.error('Failed to fetch data: ', error)
      } finally {
        if (isMounted) {
          setIsLoading(false)
          setReload(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [id, page, reload, dateRange, dataType])

  const handleChangePage = (page: number) => {
    setPage(page)
    window.history.replaceState(null, '', `${pathname}/?page=${page}`)
  }

  const handleReload = () => {
    // TODO: change page in URL also
    setPage(1)
    setReload(true)
  }

  const handleDateFilter = (date: DateRange | undefined) => {
    setDateRange(date)
  }

  const handleExportPdf = useCallback(() => {
    setIsExporting(true)
    generatePDF(targetRef, options).finally(() => {
      setIsExporting(false)
    })
  }, [])

  return (
    <>
      <div ref={targetRef}>
        <CountByDate dataType={dataType} />
        <div className="flex items-center justify-between gap-x-6 bg-gray-100 py-2 px-8 rounded-tl-lg rounded-tr-lg">
          <div className="inline-flex items-center gap-x-2">
            <DateFilter onSelect={handleDateFilter} />
          </div>
          <div className="inline-flex items-center gap-x-2">
            <TableActions
              onReload={handleReload}
              isLoading={isLoading}
              onExport={handleExportPdf}
              isExporting={isExporting}
            />
          </div>
        </div>
        {data.length > 0 ? (
          <>
            {dataType === 'visits' && <VisitsTable data={data as IVisit[]} />}
            {dataType === 'events' && <EventsTable data={data as IEvent[]} />}
            {dataType === 'navigation' && (
              <NavigationTable data={data as IEvent[]} />
            )}
            {dataType === 'traffic' && (
              <TrafficTable data={data as ICustomer[]} />
            )}
            <Pagination
              page={page}
              onChange={handleChangePage}
              meta={meta}
              dataLength={data.length}
            />
          </>
        ) : isLoading ? (
          <div className="flex flex-col space-y-1">
            {Array(PAGINATION.LIMIT)
              .fill({})
              .map((e, index) => (
                <Skeleton
                  key={`visit-skeleton-${index}`}
                  className="h-16 w-full"
                />
              ))}
          </div>
        ) : (
          <AlertInfo
            title={`No ${dataType} Data Available`}
            description="There is currently no visit data to display. Please try refreshing the page or check back later."
          />
        )}
      </div>
    </>
  )
}

export default Analytics
