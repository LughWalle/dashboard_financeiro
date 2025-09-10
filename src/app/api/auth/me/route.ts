import { NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/auth'

export const GET = async () => {
  try {
    const user = await getAuthUser()
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    return NextResponse.json({ user }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error', error: error }, { status: 500 })
  }
}