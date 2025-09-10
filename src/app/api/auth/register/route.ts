import { NextResponse } from "next/server"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { createUserMock, getUserMockByEmail } from "@/lib/userMock"

const bodySchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  name: z.string().min(2),
})

export const POST = async (req: Request) => {
  try {
    const { email, password, name } = bodySchema.parse(await req.json())
    
    const existingUser = await getUserMockByEmail(email)
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 })
    }
    
    const hashedPassword = bcrypt.hashSync(password, 10)
    
    const newUser = await createUserMock({
      email,
      password: hashedPassword,
      name,
      role: 'user'
    })
    
    if (!newUser) {
      return NextResponse.json({ message: 'Failed to create user' }, { status: 500 })
    }
    
    return NextResponse.json({ message: 'User created successfully', user: newUser }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error', error: error }, { status: 500 })
  }
}