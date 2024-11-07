import { NextResponse } from 'next/server'
import { getError } from '@/utils/getError'
import { analyticsDataClient } from '@/lib/google/client'

const propertyId = process.env.GA_PROPERTY_ID

export async function GET() {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dimensions: [
        {
          name: 'country',
        },
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
      ],
      dateRanges: [
        {
          startDate: '2020-09-01',
          endDate: '2020-09-15',
        },
      ],
    })

    console.log('google ', response)

    return NextResponse.json(
      {
        response,
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    return NextResponse.json({ status: 500, message: getError(error as Error) })
  }
}