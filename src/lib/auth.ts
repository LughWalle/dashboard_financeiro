import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;

if (!JWT_SECRET || !JWT_EXPIRES) {
  throw new Error('JWT_SECRET or JWT_EXPIRATION is not set');
}

export type jwtPayloadType = {
  id: number;
  email: string;
  name: string;
  role: string;
};

export const signAuthToken = (payload: jwtPayloadType) => {
    return jwt.sign(payload, JWT_SECRET)
}

export const verifyAuthToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET) as jwtPayloadType
}

export const setAuthCookie = async(token: string) => {
  const cookiesStore = await cookies()
  cookiesStore.set('token', token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: Number(JWT_EXPIRES),
  })
}

export const clearAuthCookie = async () => {
  const cookiesStore = await cookies()
  cookiesStore.delete('token')
}

export const getAuthCookie = async () => {
  const cookiesStore = await cookies()
  return cookiesStore.get('token')?.value
}

export const getAuthUser = async () => {
  const token = await getAuthCookie()
  if (!token) return null
  const decoded = verifyAuthToken(token)
  return decoded
}