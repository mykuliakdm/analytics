import { NextRequest, NextResponse } from 'next/server'
import { getError } from '@/utils/getError'
import db from '@/utils/db'
import Projects from '../../../../../../models/Project'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

type Params = {
  id: string
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = params
    const session = await getServerSession(authOptions)

    if (session) {
      await db.connect()

      await Projects.findOneAndDelete({
        _id: id,
      })

      return NextResponse.json(
        {
          data: null,
          error: null,
        },
        {
          status: 200,
        },
      )
    }

    return NextResponse.json(
      {
        data: null,
        error: 'User not logged in',
      },
      {
        status: 400,
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
