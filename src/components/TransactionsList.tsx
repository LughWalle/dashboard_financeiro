'use client'
import React from 'react'
import { SortField } from '@/lib/transactionsMock'
import { useTransactions } from '@/contexts/transactions'

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
  const {
    state,
    setItemsPerPage,
    setSort,
    setSearch,
    setTypeFilter,
    getPaginatedData,
    setPage,
    goToNextPage,
    goToPrevPage,
    goToFirstPage,
    goToLastPage
  } = useTransactions()

  const {
    loading,
    currentPage,
    totalPages,
    totalItems,
    sortField,
    sortOrder,
    searchTerm,
    typeFilter
  } = state

  React.useEffect(() => {
    if (state.itemsPerPage !== itemsPerPage) {
      setItemsPerPage(itemsPerPage)
    }
  }, [itemsPerPage, setItemsPerPage, state.itemsPerPage])

  const handleSortChange = (field: SortField) => {
    if (field === sortField) {
      setSort(field, sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSort(field, 'asc')
    }
  }

  const transactions = getPaginatedData()

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
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '200px',
        fontSize: '18px',
        color: '#666'
      }}>
        Carregando transações...
      </div>
    )
  }

  return (
    <div>
      <h2>Transações</h2>
      <div style={{ 
        marginBottom: '20px', 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '15px' }}>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Buscar:
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por conta, indústria, estado, valor..."
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Tipo:
            </label>
            <select 
              value={typeFilter} 
              onChange={(e) => setTypeFilter(e.target.value as 'all' | 'deposit' | 'withdraw')}
              style={{
                padding: '8px 12px',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                backgroundColor: '#fff'
              }}
            >
              <option value="all">Todos</option>
              <option value="deposit">Depósitos</option>
              <option value="withdraw">Saques</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Itens por página:
            </label>
            <select 
              value={state.itemsPerPage} 
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              style={{
                padding: '8px 12px',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                backgroundColor: '#fff'
              }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div style={{ 
            padding: '8px 12px', 
            backgroundColor: '#e9ecef', 
            borderRadius: '4px',
            fontSize: '14px',
            color: '#495057'
          }}>
            <strong>{totalItems}</strong> transações encontradas
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: '10px', color: '#495057' }}>Ordenar por:</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
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
                  fontSize: '14px',
                  transition: 'all 0.2s'
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
      </div>

      <div style={{ marginBottom: '20px' }}>
        {transactions.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: '#666',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px'
          }}>
            Nenhuma transação encontrada com os filtros aplicados.
          </div>
        ) : (
          transactions.map((transaction) => (
            <div 
              key={transaction.id}
              style={{
                padding: '15px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                marginBottom: '10px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
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
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <p style={{ marginBottom: '15px', fontSize: '16px', color: '#495057' }}>
            Página {currentPage} de {totalPages} 
            ({totalItems} transações total)
          </p>
          
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={goToFirstPage}
              disabled={currentPage === 1}
              style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: currentPage === 1 ? '#f5f5f5' : '#fff',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                opacity: currentPage === 1 ? 0.6 : 1
              }}
            >
              Primeira
            </button>
            
            <button 
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: currentPage === 1 ? '#f5f5f5' : '#fff',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                opacity: currentPage === 1 ? 0.6 : 1
              }}
            >
              Anterior
            </button>
            
            <span style={{ 
              padding: '8px 16px', 
              backgroundColor: '#007bff', 
              color: '#fff', 
              borderRadius: '4px',
              fontWeight: 'bold'
            }}>
              {currentPage}
            </span>
            
            <button 
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: currentPage === totalPages ? '#f5f5f5' : '#fff',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                opacity: currentPage === totalPages ? 0.6 : 1
              }}
            >
              Próxima
            </button>
            
            <button 
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
              style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: currentPage === totalPages ? '#f5f5f5' : '#fff',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                opacity: currentPage === totalPages ? 0.6 : 1
              }}
            >
              Última
            </button>
          </div>

          <div style={{ marginTop: '15px' }}>
            <span style={{ marginRight: '10px', fontSize: '14px', color: '#666' }}>
              Ir para página:
            </span>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={(e) => {
                const page = parseInt(e.target.value)
                if (page >= 1 && page <= totalPages) {
                  setPage(page)
                }
              }}
              style={{
                width: '60px',
                padding: '4px 8px',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                textAlign: 'center'
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}