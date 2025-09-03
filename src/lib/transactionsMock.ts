import transactionsMock from './transactions.json'
export interface Transaction {
  date: number
  amount: string
  transaction_type: 'deposit' | 'withdrawal'
  currency: string
  account: string
  industry: string
  state: string
}

export const getTransactionsMock = (): Transaction => {
  return JSON.parse(JSON.stringify(transactionsMock))
}
