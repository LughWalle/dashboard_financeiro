import { NextResponse } from "next/server"
import { getAllTransactionsMock } from "@/lib/transactionsMock"

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('_page') || '1')
    const limit = parseInt(searchParams.get('_per_page') || '10')

    const transactions = await getAllTransactionsMock(page, limit)

    

    return NextResponse.json(transactions, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
