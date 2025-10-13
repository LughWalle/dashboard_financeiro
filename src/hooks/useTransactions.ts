import { useContext } from 'react'
import { TransactionsContext } from '../contexts/transactions/context'

export const useTransactions = () => {
  const context = useContext(TransactionsContext)
  if (context === undefined) {
    throw new Error('useTransactions deve ser usado dentro de um TransactionsProvider')
  }
  return context
}
