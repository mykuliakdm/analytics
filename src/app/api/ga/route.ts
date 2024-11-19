import { NextRequest, NextResponse } from 'next/server'
import { getError } from '@/utils/getError'
import { analyticsDataClient } from '@/lib/ga/client'
import db from '@/utils/db'
import Projects from '../../../../models/Project'
import { IProject } from '@/utils/types'

export async function GET(req: NextRequest) {
  const projectId = req.nextUrl.searchParams.get('projectId')

  try {
    await db.connect()

    const project = (await Projects.findOne({
      _id: projectId,
    }).exec()) as IProject

    if (project && project.google?.isConnected) {
      const [response] = await analyticsDataClient.runReport({
        property: `properties/${project.google.propertyId}`,
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
          data: response,
          success: true,
          error: null,
        },
        {
          status: 200,
        },
      )
    } else {
      return NextResponse.json(
        {
          data: null,
          success: false,
          error: `We were unable to connect Google Analytics to ${project.name}. Please try connecting later.`,
        },
        {
          status: 500,
        },
      )
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: getError(error as Error),
    })
  }
}
