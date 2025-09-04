import { NextResponse } from "next/server"
import { z } from "zod"
import { verifyUserMock } from "@/lib/userMock"
import { signAuthToken, setAuthCookie } from "@/lib/auth"

const bodySchema = z.object({
  email: z.email(),
  password: z.string().min(6),
})

export const POST = async (req: Request) => {
  try {
    const { email, password } = bodySchema.parse(await req.json())
    const user = await verifyUserMock(email, password)
    if (!user) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    
    const token = await signAuthToken({ id: user.id, email: user.email, name: user.name, role: user.role })
    await setAuthCookie(token)
    return NextResponse.json({ message: 'Login successful', user }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}