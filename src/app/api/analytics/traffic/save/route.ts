import { NextRequest, NextResponse } from 'next/server'
import { IEvent } from '@/utils/types'
import { getError } from '@/utils/getError'
import db from '@/utils/db'
import Customer from '../../../../../../models/Customer'
import axios from 'axios'

export async function POST(req: NextRequest) {
  const data: IEvent = await req.json()

  try {
    await db.connect()

    const { data: customerDataByIp = null } = await axios.get(
      `http://ip-api.com/json/${data.ip}`,
    )

    await new Customer({
      ...data,
      details: customerDataByIp,
    }).save()

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
