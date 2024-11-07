import { NextRequest, NextResponse } from 'next/server'
import { startOfDay, endOfDay } from 'date-fns'
import db from '@/utils/db'
import { getError } from '@/utils/getError'
import { PAGINATION } from '@/config/constants'
import Events from '../../../../../../models/Event'

type ParamsProps = {
  projectId: string
}

type FiltersProps = {
  projectId: string
  createdAt?: {
    $gte?: Date
    $lte?: Date
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: ParamsProps },
) {
  const { projectId } = params
  const page = req.nextUrl.searchParams.get('page') || 1
  const from = req.nextUrl.searchParams.get('dateRange[from]')
  const to = req.nextUrl.searchParams.get('dateRange[to]')

  const filters: FiltersProps = { projectId }

  if (from || to) {
    filters.createdAt = {}
    if (from) {
      filters.createdAt = { ...filters.createdAt, $gte: startOfDay(from) }
    }

    if (to) {
      filters.createdAt = { ...filters.createdAt, $lte: endOfDay(to) }
    }
  }

  try {
    await db.connect()

    const events = await Events.find(filters)
      .where('element')
      .equals('A')
      .limit(PAGINATION.LIMIT)
      .skip(PAGINATION.LIMIT * (Number(page) - 1))
      .sort({ field: 'asc', createdAt: -1 })
      .exec()

    const totalCount = await Events.where('element')
      .equals('A')
      .countDocuments(filters)

    return NextResponse.json(
      {
        data: events,
        meta: {
          totalCount,
        },
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    return NextResponse.json({ status: 500, message: getError(error as Error) })
  }
}
