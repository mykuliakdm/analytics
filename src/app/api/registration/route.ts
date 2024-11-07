import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import db from '@/utils/db'
import User from '../../../../models/User'

type dataType = {
  name: string
  email: string
  password: string
}

async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12)
}

export async function POST(req: NextRequest) {
  try {
    const { email, name, password }: dataType = await req.json()

    await db.connect()
    const existingUser = await User.findOne({ email: email })

    if (existingUser) {
      return NextResponse.json(
        {
          error: 'User with this email is already registered',
        },
        {
          status: 422,
        },
      )
    }

    const hashedPassword = await hashPassword(password)

    const newUser = new User({
      email,
      name,
      password: hashedPassword,
    })

    const user = await newUser.save()

    return NextResponse.json(
      {
        user,
      },
      {
        status: 201,
      },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        error: 'Failed to create a user',
      },
      {
        status: 400,
      },
    )
  }
}
