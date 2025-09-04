const API_URL = 'http://localhost:3001'

export type Transaction = {
  id: number
  date: number
  amount: string
  transaction_type: 'deposit' | 'withdrawal'
  currency: string
  account: string
  industry: string
  state: string
}

export const getAllTransactionsMock = async (page: number, limit: number): Promise<Transaction[]> => {
  try {
    const response = await fetch(`${API_URL}/transactions?_page=${page}&_per_page=${limit}`)
    const transactions = await response.json()
    console.log(transactions)
    return transactions
    // const transactions = await response.json()
    // const start = (page - 1) * limit
    // const end = start + limit
    // return transactions.slice(start, end)
  } catch (error) {
    console.error('Erro ao buscar transações:', error)
    return []
  }
}

export const getTransactionByIdMock = async (id: number): Promise<Transaction | null> => {
  try {
    const response = await fetch(`${API_URL}/transactions/${id}`)
    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    console.error('Erro ao buscar transação:', error)
    return null
  }
}

export const createTransactionMock = async (transaction: Omit<Transaction, 'id'>): Promise<Transaction | null> => {
  try {
    const response = await fetch(`${API_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    })
    return await response.json()
  } catch (error) {
    console.error('Erro ao criar transação:', error)
    return null
  }
}

export const updateTransactionMock = async (id: number, transaction: Partial<Transaction>): Promise<Transaction | null> => {
  try {
    const response = await fetch(`${API_URL}/transactions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    })
    return await response.json()
  } catch (error) {
    console.error('Erro ao atualizar transação:', error)
    return null
  }
}

export const deleteTransactionMock = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/transactions/${id}`, {
      method: 'DELETE',
    })
    return response.ok
  } catch (error) {
    console.error('Erro ao deletar transação:', error)
    return false
  }
}
