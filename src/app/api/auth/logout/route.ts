import { NextResponse } from 'next/server'
import { clearAuthCookie } from '@/lib/auth'

export const DELETE = async (req: Request) => {
  try {
    await clearAuthCookie()
    return NextResponse.json({ message: 'Logout successful' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}