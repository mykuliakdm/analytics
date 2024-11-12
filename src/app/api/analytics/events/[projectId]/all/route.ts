import { NextRequest, NextResponse } from 'next/server'
import { getError } from '@/utils/getError'
import db from '@/utils/db'
import Events from '../../../../../../../models/Event'

type ParamsProps = {
  projectId: string
}

export async function GET(
  req: NextRequest,
  { params }: { params: ParamsProps },
) {
  const { projectId } = params

  const filters: { projectId: string } = { projectId }

  try {
    await db.connect()

    const events = await Events.find(filters)
      .select('createdAt element')
      .sort({ field: 'desc', createdAt: -1 })
      .lean()

    return NextResponse.json(
      {
        data: events,
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    return NextResponse.json({ status: 500, message: getError(error as Error) })
  }
}
