import { NextResponse } from "next/server"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { createUser, findUserByEmail } from "@/lib/staticData"

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
})

export const POST = async (req: Request) => {
  try {
    const { email, password, name } = bodySchema.parse(await req.json())
    
    // Verificar se usuário já existe
    const existingUser = findUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 })
    }
    
    // Hash da senha
    const hashedPassword = bcrypt.hashSync(password, 10)
    
    // Criar novo usuário
    const newUser = createUser({
      email,
      password: hashedPassword,
      name,
      role: 'user'
    })
    
    return NextResponse.json({ 
      message: 'User created successfully', 
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      }
    }, { status: 201 })
    
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json({ 
      message: 'Internal server error', 
      error: process.env.NODE_ENV === 'development' ? error : undefined 
    }, { status: 500 })
  }
}