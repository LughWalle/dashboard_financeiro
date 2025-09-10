import { NextResponse } from "next/server"
import { 
  transactions,
  sortTransactions,
  paginateTransactions,
  Transaction,
  SortField,
  SortOrder 
} from "@/lib/staticData"

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url)
    
    // Se não há parâmetros, retorna todas as transações
    if (searchParams.size === 0) {
      return NextResponse.json(transactions, { status: 200 })
    }

    // Parâmetros de paginação e ordenação
    const page = parseInt(searchParams.get('_page') || '1')
    const limit = parseInt(searchParams.get('_per_page') || '10')
    const sortField = searchParams.get('_sort') as SortField || undefined
    const sortOrder = searchParams.get('_order') as SortOrder || undefined

    // Validação dos parâmetros de ordenação
    if (sortField && sortOrder) {
      const validSortFields: SortField[] = ['id', 'date', 'amount', 'transaction_type', 'currency', 'account', 'industry', 'state']
      const validSortOrders: SortOrder[] = ['asc', 'desc']

      if (!validSortFields.includes(sortField) || !validSortOrders.includes(sortOrder)) {
        return NextResponse.json({ message: 'Invalid sort parameters' }, { status: 400 })
      }
    }

    // Aplicar ordenação
    let sortedTransactions = transactions
    if (sortField && sortOrder) {
      sortedTransactions = sortTransactions(transactions, sortField, sortOrder)
    }

    // Aplicar paginação
    const paginatedResult = paginateTransactions(sortedTransactions, page, limit)

    // Retornar no formato esperado pelo JSON Server
    return NextResponse.json({
      data: paginatedResult.data,
      first: 1,
      last: Math.ceil(paginatedResult.total / limit),
      next: page < Math.ceil(paginatedResult.total / limit) ? page + 1 : null,
      pages: Math.ceil(paginatedResult.total / limit),
      prev: page > 1 ? page - 1 : null,
      items: paginatedResult.total
    }, { 
      status: 200,
      headers: {
        'X-Total-Count': paginatedResult.total.toString()
      }
    })

  } catch (error) {
    console.error('Error in transactions API:', error)
    return NextResponse.json({ 
      message: 'Internal server error', 
      error: process.env.NODE_ENV === 'development' ? error : undefined 
    }, { status: 500 })
  }
}