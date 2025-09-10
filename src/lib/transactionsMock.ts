// Agora usa as API routes internas do Next.js em vez do JSON Server
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export type Transaction = {
  id: number
  date: number
  amount: string
  transaction_type: 'deposit' | 'withdraw'
  currency: string
  account: string
  industry: string
  state: string
}

export type SortField = 'id' | 'date' | 'amount' | 'transaction_type' | 'currency' | 'account' | 'industry' | 'state'
export type SortOrder = 'asc' | 'desc'

export const getAllTransactionsMock = async (
  sortField?: SortField, 
  sortOrder?: SortOrder
): Promise<Transaction[]> => {
  try {
    let url = `${API_URL}/api/transactions`
    if (sortField && sortOrder) {
      url += `?_sort=${sortField}&_order=${sortOrder}`
    }
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const transactions = await response.json()
    return Array.isArray(transactions) ? transactions : []
  } catch (error) {
    console.error('Erro ao buscar transações:', error)
    return []
  }
}

export const getPaginatedTransactionsMock = async (
  page: number = 1,
  limit: number = 10,
  sortField?: SortField,
  sortOrder?: SortOrder
): Promise<{
  data: Transaction[],
  first: number,
  last: number,
  next: number | null,
  pages: number,
  prev: number | null,
  items: number
}> => {
  try {
    let url = `${API_URL}/api/transactions?_page=${page}&_per_page=${limit}`
    
    if (sortField && sortOrder) {
      url += `&_sort=${sortField}&_order=${sortOrder}`
    }
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    return result
  } catch (error) {
    console.error('Erro ao buscar transações paginadas:', error)
    return {
      data: [],
      first: 1,
      last: 1,
      next: null,
      pages: 1,
      prev: null,
      items: 0
    }
  }
}

export const getTransactionMockById = async (id: number): Promise<Transaction | null> => {
  try {
    const transactions = await getAllTransactionsMock()
    return transactions.find(t => t.id === id) || null
  } catch (error) {
    console.error('Erro ao buscar transação por ID:', error)
    return null
  }
}

export const createTransactionMock = async (transaction: Omit<Transaction, 'id'>): Promise<Transaction | null> => {
  try {
    const response = await fetch(`${API_URL}/api/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Erro ao criar transação:', error)
    return null
  }
}

export const updateTransactionMock = async (id: number, transaction: Partial<Transaction>): Promise<Transaction | null> => {
  try {
    const response = await fetch(`${API_URL}/api/transactions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Erro ao atualizar transação:', error)
    return null
  }
}

export const deleteTransactionMock = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/api/transactions/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    return response.ok
  } catch (error) {
    console.error('Erro ao deletar transação:', error)
    return false
  }
}