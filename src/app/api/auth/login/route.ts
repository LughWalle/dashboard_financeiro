import { NextResponse } from "next/server"
import { z } from "zod"
import { findUserByEmail } from "@/lib/staticData"
import { signAuthToken, setAuthCookie } from "@/lib/auth"
import bcrypt from 'bcryptjs'

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const POST = async (req: Request) => {
  try {
    const { email, password } = bodySchema.parse(await req.json())
    
    // Buscar usuário pelos dados estáticos
    const user = findUserByEmail(email)
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }
    
    // Verificar senha
    const isPasswordValid = bcrypt.compareSync(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }
    
    // Gerar token e cookie (converter id para number)
    const token = await signAuthToken({ 
      id: parseInt(user.id), 
      email: user.email, 
      name: user.name, 
      role: user.role 
    })
    
    await setAuthCookie(token)
    
    return NextResponse.json({ 
      message: 'Login successful', 
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    }, { status: 200 })
    
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ 
      message: 'Internal server error', 
      error: process.env.NODE_ENV === 'development' ? error : undefined 
    }, { status: 500 })
  }
}