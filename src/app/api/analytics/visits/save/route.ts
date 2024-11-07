import { NextRequest, NextResponse } from 'next/server'
import { IVisit } from '@/utils/types'
import { getError } from '@/utils/getError'
import db from '@/utils/db'
import Visit from '../../../../../../models/Visit'

export async function POST(req: NextRequest) {
  const data: IVisit = await req.json()

  try {
    await db.connect()

    await new Visit({ ...data }).save()

    return NextResponse.json(
      {
        success: true,
      },
      {
        status: 201,
      },
    )
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: getError(error as Error),
    })
  }
}
