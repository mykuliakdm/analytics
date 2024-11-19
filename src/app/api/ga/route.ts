import { NextResponse } from 'next/server'
import { getError } from '@/utils/getError'
import { analyticsDataClient } from '@/lib/ga/client'

const propertyId = process.env.GA_PROPERTY_ID

export async function GET() {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: `7daysAgo`, //👈  e.g. "7daysAgo" or "30daysAgo"
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'city',
        },
        {
          name: 'country',
        },
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
        {
          name: 'eventCount',
        },
        {
          name: 'newUsers',
        },
        {
          name: 'totalRevenue',
        },
        {
          name: 'sessions',
        },
      ],
    })

    return NextResponse.json(
      {
        response,
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: getError(error as Error),
    })
  }
}
