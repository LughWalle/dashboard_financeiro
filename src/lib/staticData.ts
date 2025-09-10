// Dados estáticos para substituir o JSON Server
import transactionsJson from './transactions.json'

export type Transaction = {
  id?: number
  date: number
  amount: string
  transaction_type: 'deposit' | 'withdraw'
  currency: string
  account: string
  industry: string
  state: string
}

export type User = {
  id: string
  email: string
  name: string
  role: string
  password: string
}

// Dados de transações do arquivo JSON
export const transactions: Transaction[] = transactionsJson.map((transaction, index) => ({
  id: index + 1,
  date: transaction.date,
  amount: transaction.amount,
  transaction_type: transaction.transaction_type as 'deposit' | 'withdraw',
  currency: transaction.currency,
  account: transaction.account,
  industry: transaction.industry,
  state: transaction.state
}))

// Usuários mocados (substitui db.json)
export const users: User[] = [
  {
    id: "1",
    email: "admin@test.com",
    name: "Admin",
    role: "admin",
    password: "$2a$10$C50QNMoX0IB0xBGhuqde1u7T8d4.erMdsOfOcUaV22giKONhBz3iy" // senha: admin123
  },
  {
    id: "2",
    email: "user@test.com",
    name: "User",
    role: "user", 
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi" // senha: password
  },
  {
    id: "3",
    email: "demo@dashboard.com",
    name: "Demo User",
    role: "user",
    password: "$2a$10$C50QNMoX0IB0xBGhuqde1u7T8d4.erMdsOfOcUaV22giKONhBz3iy" // senha: demo123
  }
]

export type SortField = 'id' | 'date' | 'amount' | 'transaction_type' | 'currency' | 'account' | 'industry' | 'state'
export type SortOrder = 'asc' | 'desc'

// Função para ordenar transações
export const sortTransactions = (data: Transaction[], sortField?: SortField, sortOrder?: SortOrder): Transaction[] => {
  if (!sortField || !sortOrder) return data

  return [...data].sort((a, b) => {
    let aValue: any = a[sortField]
    let bValue: any = b[sortField]

    // Conversão de tipos para ordenação
    if (sortField === 'date' || sortField === 'id') {
      aValue = Number(aValue)
      bValue = Number(bValue)
    } else if (sortField === 'amount') {
      aValue = parseFloat(aValue)
      bValue = parseFloat(bValue)
    } else {
      aValue = String(aValue).toLowerCase()
      bValue = String(bValue).toLowerCase()
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })
}

// Função para paginar transações
export const paginateTransactions = (
  data: Transaction[], 
  page: number = 1, 
  limit: number = 10
): { data: Transaction[], total: number, page: number, limit: number } => {
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  
  return {
    data: data.slice(startIndex, endIndex),
    total: data.length,
    page,
    limit
  }
}

// Função para buscar usuário por email
export const findUserByEmail = (email: string): User | null => {
  return users.find(user => user.email === email) || null
}

// Função para buscar usuário por ID
export const findUserById = (id: string): User | null => {
  return users.find(user => user.id === id) || null
}

// Função para criar novo usuário
export const createUser = (userData: Omit<User, 'id'>): User => {
  const newId = (users.length + 1).toString()
  const newUser: User = {
    id: newId,
    ...userData
  }
  users.push(newUser)
  return newUser
}
