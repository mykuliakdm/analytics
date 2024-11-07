import { NextRequest, NextResponse } from 'next/server'

type dataType = {
  name?: string
}

export async function POST(req: NextRequest) {
  const data: dataType = await req.json()

  console.log('data ', data)

  const responseMessage = `Hello, ${data.name || 'NO NAME PERSON'}!`

  return NextResponse.json({
    message: responseMessage,
  })
}
