import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/register',
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/logout',
  '/api/auth/me'
]

export const middleware = (req: NextRequest) => {
  const { pathname } = req.nextUrl

  const isPublicRoute = PUBLIC_ROUTES.some((p: string) => pathname === p || pathname.startsWith(`${p}/`))
  if (isPublicRoute) return NextResponse.next()

  const token = req.cookies.get('token')?.value
  if (!token) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET! as string)
    return NextResponse.next()
  } catch {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|fonts|icons).*)',
    '/(api|trpc)(.*)'
  ]
}