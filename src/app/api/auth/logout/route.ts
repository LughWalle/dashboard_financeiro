import { NextResponse } from 'next/server'
import { clearAuthCookie } from '@/lib/auth'

export const DELETE = async () => {
  try {
    await clearAuthCookie()
    return NextResponse.json({ message: 'Logout successful' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error', error: error }, { status: 500 })
  }
}