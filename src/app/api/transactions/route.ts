import { NextResponse } from "next/server"
import { 
  getAllTransactionsMock, 
  getPaginatedTransactionsMock,
  Transaction,
  SortField,
  SortOrder 
} from "@/lib/transactionsMock"

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url)
    let transactions = []

    if (searchParams.size === 0) {
      transactions = await getAllTransactionsMock()
      let count = 0
      transactions.forEach((transaction: Transaction) => {
        if (transaction.transaction_type === 'deposit') {
          count += 1
        }
      })
      console.log(count)
      
    } else {
      const page = parseInt(searchParams.get('_page') || '1')
      const limit = parseInt(searchParams.get('_per_page') || '10')
      const sortField = searchParams.get('_sort') as SortField || undefined
      const sortOrder = searchParams.get('_order') as SortOrder || undefined

      if (sortField && sortOrder) {
        const validSortFields: SortField[] = ['id', 'date', 'amount', 'transaction_type', 'currency', 'account', 'industry', 'state']
        const validSortOrders: SortOrder[] = ['asc', 'desc']

        if (!validSortFields.includes(sortField) || !validSortOrders.includes(sortOrder)) {
          return NextResponse.json({ message: 'Invalid sort parameters' }, { status: 400 })
        }
      }

      transactions = await getPaginatedTransactionsMock(page, limit, sortField, sortOrder)
    }

    return NextResponse.json(transactions, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error', error: error }, { status: 500 })
  }
}
