import { NextRequest, NextResponse } from 'next/server'
import { endOfDay, startOfDay } from 'date-fns'
import db from '@/utils/db'
import { getError } from '@/utils/getError'
import Customer from '../../../../../../models/Customer'

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

    const customers = await Customer.find(filters)
      .sort({ field: 'asc', createdAt: -1 })
      .lean()

    const totalCount = await Customer.countDocuments(filters)

    return NextResponse.json(
      {
        data: customers,
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
