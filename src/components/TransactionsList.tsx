'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Transaction } from '@/lib/transactionsMock'

interface TransactionsResponse {
  first: number
  prev: number | null
  next: number | null
  last: number
  pages: number
  items: number
  data?: Transaction[]
}

interface TransactionsListProps {
  itemsPerPage?: number
}

export default function TransactionsList({ itemsPerPage = 25 }: TransactionsListProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [pagination, setPagination] = useState<TransactionsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchTransactions = async (page: number = 1) => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/transactions?_page=${page}&_per_page=${itemsPerPage}`)
      
      setTransactions(response.data.data)
      setPagination({
        first: response.data.first,
        prev: response.data.prev,
        next: response.data.next,
        last: response.data.last,
        pages: response.data.pages,
        items: response.data.items
      })
    } catch (error) {
      console.error('Erro ao buscar transações:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions(currentPage)
  }, [currentPage, itemsPerPage])

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  if (loading) {
    return <div>Carregando transações...</div>
  }

  return (
    <div>
      <h2>Transações</h2>
      <div>
        {transactions.map((transaction) => (
          <div key={transaction.id}>
            <p>ID: {transaction.id}</p>
            <p>Valor: {transaction.amount}</p>
            <p>Tipo: {transaction.transaction_type}</p>
            <p>Conta: {transaction.account}</p>
            <hr />
          </div>
        ))}
      </div>
      {pagination && (
        <div>
          <p>
            Página {currentPage} de {pagination.pages} 
            ({pagination.items} transações total)
          </p>
          
          <div>
            <button 
              onClick={() => handlePageChange(pagination.first)}
              disabled={currentPage === pagination.first}
            >
              Primeira
            </button>
            
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!pagination.prev}
            >
              Anterior
            </button>
            
            <span> Página {currentPage} </span>
            
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!pagination.next}
            >
              Próxima
            </button>
            
            <button 
              onClick={() => handlePageChange(pagination.last)}
              disabled={currentPage === pagination.last}
            >
              Última
            </button>
          </div>
        </div>
      )}
    </div>
  )
}