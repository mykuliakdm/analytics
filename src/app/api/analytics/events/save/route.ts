import { NextRequest, NextResponse } from 'next/server'
import { IEvent } from '@/utils/types'
import { getError } from '@/utils/getError'
import db from '@/utils/db'
import Event from '../../../../../../models/Event'

export async function POST(req: NextRequest) {
  const data: IEvent = await req.json()

  try {
    await db.connect()

    await new Event({ ...data }).save()

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
