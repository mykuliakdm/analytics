import { NextRequest, NextResponse } from 'next/server'
import { getError } from '@/utils/getError'
import db from '@/utils/db'
import Projects from '../../../../../models/Project'

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
        data: project,
        error: null,
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        error: getError(error as Error),
      },
      {
        status: 500,
      },
    )
  }
}
