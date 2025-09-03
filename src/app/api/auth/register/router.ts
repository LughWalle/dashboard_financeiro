import { NextResponse } from "next/server"
import { z } from "zod"
import { createUserMock, userMockList } from "@/lib/userMock"

const bodySchema = z.object({
  email: z.email(),
  name: z.string().min(3),
  password: z.string().min(6),
  role: z.enum(['admin', 'user']).optional(),
})

export const POST = async (req: Request) => {
  try {
    const body = await req.json()
    const { email, name, password, role } = bodySchema.parse(body)
    const user = createUserMock({
      id: userMockList.length + 1,
      email,
      name,
      password,
      role: role || 'user',
    })
    return NextResponse.json({ message: 'User created successfully' }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}