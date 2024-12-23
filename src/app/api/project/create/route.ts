import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import db from '@/utils/db'
import Project from '../../../../../models/Project'
import { getError } from '@/utils/getError'

type dataType = {
  name: string
  url: string
  propertyId?: string
}

export async function POST(req: NextRequest) {
  try {
    const data: dataType = await req.json()
    const session = await getServerSession(authOptions)

    if (session) {
      await db.connect()

      const project = await new Project({
        userId: session.user.id,
        ...data,
        google: {
          propertyId: data.propertyId || '',
          isConnected: false,
        },
      }).save()

      return NextResponse.json(
        {
          data: project,
          error: null,
        },
        {
          status: 201,
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
    console.error(error)
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
