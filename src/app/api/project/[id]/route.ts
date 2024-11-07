import { NextRequest, NextResponse } from 'next/server'
import { getError } from '@/utils/getError'
import db from '@/utils/db'
import Projects from '../../../../../models/Projects'

type Params = {
  id: string
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { id } = params

  try {
    await db.connect()

    const project = await Projects.findOne({
      _id: id,
    }).exec()

    return NextResponse.json(
      {
        project,
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    return NextResponse.json({ status: 500, message: getError(error as Error) })
  }
}
