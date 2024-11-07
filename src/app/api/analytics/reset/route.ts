import { NextRequest, NextResponse } from 'next/server'
import { getError } from '@/utils/getError'
import db from '@/utils/db'
import Events from '../../../../../models/Event'
import Visits from '../../../../../models/Visit'

export async function GET(req: NextRequest) {
  const dataType = req.nextUrl.searchParams.get('dataType')
  const projectId = req.nextUrl.searchParams.get('projectId')

  try {
    await db.connect()

    switch (dataType) {
      case 'visits':
        await Visits.deleteMany({ projectId })
        break
      case 'events':
        await Events.deleteMany({ projectId })
        break
      case 'navigation':
        await Events.deleteMany({ projectId, element: 'A' })
        break
      default:
        return NextResponse.json({
          status: 400,
          message: 'Invalid data type',
        })
    }

    return NextResponse.json(
      {
        success: true,
      },
      {
        status: 201,
      },
    )
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({
      status: 500,
      message: getError(error as Error),
    })
  }
}
