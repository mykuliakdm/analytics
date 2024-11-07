import { NextRequest, NextResponse } from 'next/server'
import { getError } from '@/utils/getError'
import db from '@/utils/db'
import Projects from '../../../../../models/Projects'

type Params = {
  userId: string
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { userId } = params

  try {
    await db.connect()

    const projects = await Projects.find({
      userId,
    }).lean()

    return NextResponse.json(
      {
        projects,
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    return NextResponse.json({ status: 500, message: getError(error as Error) })
  }
}
