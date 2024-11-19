'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { getError } from '@/utils/getError'
import { IGAData } from '@/utils/types'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { PAGINATION } from '@/config/constants'

type GAPlateProps = {
  projectId: string
}

const GAPlate = ({ projectId }: GAPlateProps) => {
  const [data, setData] = useState<IGAData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)
    setData(null)
    let isMounted = true
    const fetchData = async () => {
      try {
        if (isMounted) {
          const { data } = await axios.get('/api/ga', {
            params: { projectId },
          })
          setData(data.data)
        }
      } catch (error) {
        console.error('Failed to fetch data: ', getError(error as Error))
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [projectId])

  if (isLoading && data === null) {
    return (
      <div className="flex gap-x-4">
        {Array(PAGINATION.LIMIT)
          .fill({})
          .map((e, index) => (
            <Skeleton
              key={`visit-skeleton-${index}`}
              className="h-[96px] w-[100px]"
            />
          ))}
      </div>
    )
  }

  return (
    <>
      <div className="pb-8">
        <h3 className="text-2xl font-extrabold tracking-tight mb-2">
          Dimension
        </h3>
        <div className="flex gap-x-4">
          {data?.rows[0].dimensionValues.map((item, index) => (
            <Card key={`ga-dimension-${index}`}>
              <CardHeader>
                <CardTitle className="text-xl">
                  <span className="capitalize">
                    {data?.dimensionHeaders[index].name}
                  </span>
                </CardTitle>
                <CardDescription>{item.value}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
      <div className="pb-8">
        <h3 className="text-2xl font-extrabold tracking-tight mb-2">Metrics</h3>
        <div className="flex gap-x-4">
          {data?.rows[0].metricValues.map((item, index) => (
            <Card key={`ga-metric-${index}`}>
              <CardHeader>
                <CardTitle>
                  <span className="capitalize">
                    {data?.metricHeaders[index].name}
                  </span>
                </CardTitle>
                <CardDescription>{item.value}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

export default GAPlate
