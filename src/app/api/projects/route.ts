import { NextResponse } from 'next/server'
import { getError } from '@/utils/getError'
import db from '@/utils/db'
import Projects from '../../../../models/Project'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET() {
  const session = await getServerSession(authOptions)

  try {
    if (session) {
      await db.connect()

      const projects = await Projects.find({
        userId: session.user.id,
      })
        .sort({ field: 'asc', createdAt: -1 })
        .lean()

      return NextResponse.json(
        {
          data: projects,
        },
        {
          status: 200,
        },
      )
    }

    return NextResponse.json(
      {
        data: null,
        error:
          'Access Denied: You must be signed in to view the projects. Please log in to continue.',
      },
      {
        status: 400,
      },
    )
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: getError(error as Error),
    })
  }
}
