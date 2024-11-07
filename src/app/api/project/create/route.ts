import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import db from '@/utils/db'
import Project from '../../../../../models/Projects'

type dataType = {
  name: string
  url: string
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
      }).save()

      return NextResponse.json(
        {
          project,
        },
        {
          status: 201,
        },
      )
    }
    return NextResponse.json(
      {
        error: 'User not found',
      },
      {
        status: 400,
      },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        error: 'Failed to create a project.',
      },
      {
        status: 400,
      },
    )
  }
}
