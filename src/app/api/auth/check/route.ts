import { NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/auth'

export const GET = async () => {
  try {
    const user = await getAuthUser()
    return NextResponse.json({ user, isAuthenticated: !!user }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ user: null, isAuthenticated: false }, { status: 200 })
  }
}