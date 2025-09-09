'use client'
import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { Transaction, SortField, SortOrder } from '@/lib/transactionsMock'

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

const sortOptions: { value: SortField; label: string }[] = [
  { value: 'id', label: 'ID' },
  { value: 'date', label: 'Data' },
  { value: 'amount', label: 'Valor' },
  { value: 'transaction_type', label: 'Tipo de Transação' },
  { value: 'currency', label: 'Moeda' },
  { value: 'account', label: 'Conta' },
  { value: 'industry', label: 'Indústria' },
  { value: 'state', label: 'Estado' }
]

export default function TransactionsList({ itemsPerPage = 25 }: TransactionsListProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [pagination, setPagination] = useState<TransactionsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  const fetchTransactions = useCallback(async (page: number = 1) => {
    try {
      setLoading(true)
      const response = await axios.get(
        `/api/transactions?_page=${page}&_per_page=${itemsPerPage}&_sort=${sortField}&_order=${sortOrder}`
      )
      
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
  }, [itemsPerPage, sortField, sortOrder])

  useEffect(() => {
    fetchTransactions(currentPage)
  }, [currentPage, itemsPerPage, sortField, sortOrder, fetchTransactions])

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleSortChange = (field: SortField) => {
    if (field === sortField) {
      // Se o mesmo campo for selecionado, inverte a ordem
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      // Se um novo campo for selecionado, usa ordem ascendente
      setSortField(field)
      setSortOrder('asc')
    }
    setCurrentPage(1) // Volta para a primeira página ao ordenar
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('pt-BR')
  }

  const formatAmount = (amount: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(parseFloat(amount))
  }

  if (loading) {
    return <div>Carregando transações...</div>
  }

  return (
    <div>
      <h2>Transações</h2>
      
      {/* Controles de Ordenação */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Ordenar por:</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: sortField === option.value ? '#007bff' : '#fff',
                color: sortField === option.value ? '#fff' : '#333',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {option.label}
              {sortField === option.value && (
                <span style={{ marginLeft: '5px' }}>
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Transações */}
      <div style={{ marginBottom: '20px' }}>
        {transactions.map((transaction) => (
          <div 
            key={transaction.id}
            style={{
              padding: '15px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              marginBottom: '10px',
              backgroundColor: '#fff'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              <div>
                <strong>ID:</strong> {transaction.id}
              </div>
              <div>
                <strong>Data:</strong> {formatDate(transaction.date)}
              </div>
              <div>
                <strong>Valor:</strong> {formatAmount(transaction.amount)}
              </div>
              <div>
                <strong>Tipo:</strong> {transaction.transaction_type === 'deposit' ? 'Depósito' : 'Saque'}
              </div>
              <div>
                <strong>Conta:</strong> {transaction.account}
              </div>
              <div>
                <strong>Moeda:</strong> {transaction.currency}
              </div>
              <div>
                <strong>Indústria:</strong> {transaction.industry}
              </div>
              <div>
                <strong>Estado:</strong> {transaction.state}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginação */}
      {pagination && (
        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <p style={{ marginBottom: '15px' }}>
            Página {currentPage} de {pagination.pages} 
            ({pagination.items} transações total)
          </p>
          
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => handlePageChange(pagination.first)}
              disabled={currentPage === pagination.first}
              style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: currentPage === pagination.first ? '#f5f5f5' : '#fff',
                cursor: currentPage === pagination.first ? 'not-allowed' : 'pointer'
              }}
            >
              Primeira
            </button>
            
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!pagination.prev}
              style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: !pagination.prev ? '#f5f5f5' : '#fff',
                cursor: !pagination.prev ? 'not-allowed' : 'pointer'
              }}
            >
              Anterior
            </button>
            
            <span style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', borderRadius: '4px' }}>
              Página {currentPage}
            </span>
            
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!pagination.next}
              style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: !pagination.next ? '#f5f5f5' : '#fff',
                cursor: !pagination.next ? 'not-allowed' : 'pointer'
              }}
            >
              Próxima
            </button>
            
            <button 
              onClick={() => handlePageChange(pagination.last)}
              disabled={currentPage === pagination.last}
              style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: currentPage === pagination.last ? '#f5f5f5' : '#fff',
                cursor: currentPage === pagination.last ? 'not-allowed' : 'pointer'
              }}
            >
              Última
            </button>
          </div>
        </div>
      )}
    </div>
  )
}