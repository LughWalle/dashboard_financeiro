import { SignJWT, jwtVerify } from 'jose';
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

export const signAuthToken = async (payload: jwtPayloadType) => {
  const secret = new TextEncoder().encode(JWT_SECRET);
  const alg = 'HS256';
  
  return new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES)
    .sign(secret);
}

export const verifyAuthToken = async (token: string) => {
  const secret = new TextEncoder().encode(JWT_SECRET);
  const { payload } = await jwtVerify(token, secret);
  return payload as jwtPayloadType;
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
  const decoded = await verifyAuthToken(token)
  return decoded
}