import { NextRequest, NextResponse } from 'next/server'
import { getError } from '@/utils/getError'
import db from '@/utils/db'
import Projects from '../../../../../models/Project'
import { IProject } from '@/utils/types'
import { analyticsDataClient } from '@/lib/ga/client'

export async function GET(req: NextRequest) {
  const projectId = req.nextUrl.searchParams.get('projectId')

  try {
    await db.connect()

    const project = (await Projects.findOne({
      _id: projectId,
    }).exec()) as IProject

    // detect previous state of connection
    if (project && project.google?.isConnected) {
      return NextResponse.json(
        {
          data: project,
          success: false,
          error: `Project ${project.name} is already connected to Google Analytics.`,
        },
        {
          status: 200,
        },
      )
    }

    // connect to Google Analytics
    if (project && project.google?.propertyId) {
      const [response] = await analyticsDataClient.runReport({
        property: `properties/${project.google.propertyId}`,
        dateRanges: [
          {
            startDate: `7daysAgo`, //👈  e.g. "7daysAgo" or "30daysAgo"
            endDate: 'today',
          },
        ],
        dimensions: [],
        metrics: [
          {
            name: 'activeUsers',
          },
        ],
      })

      if (response) {
        console.log('GA response ', response)

        await Projects.findOneAndUpdate(
          { _id: projectId },
          { google: { ...project.google, isConnected: true } },
        )

        const updatedProject = await Projects.findOne({ _id: projectId })

        return NextResponse.json(
          {
            data: updatedProject,
            success: true,
            error: null,
          },
          {
            status: 200,
          },
        )
      }
    }

    // return default state
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
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        success: false,
        error: getError(error as Error),
      },
      { status: 500 },
    )
  }
}
