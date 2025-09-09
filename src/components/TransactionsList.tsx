'use client'
import React from 'react'
import { SortField } from '@/lib/transactionsMock'
import { useTransactions } from '@/contexts/transactions'
import {
  Container,
  FilterSection,
  FilterTitle,
  FilterControls,
  FilterGroup,
  FilterLabel,
  FilterSelect,
  InfoSection,
  InfoBadge,
  FilterTag,
  PageHeader,
  PageTitle,
  PageDescription
} from '@/styles/components'
import styled from 'styled-components'

// Styled Components específicos para TransactionsList
const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const TableHeader = styled.thead`
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
`

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.875rem;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
`

const TableBody = styled.tbody``

const TableRow = styled.tr`
  &:hover {
    background: #f9fafb;
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid #f3f4f6;
  }
`

const TableCell = styled.td`
  padding: 1rem;
  font-size: 0.875rem;
  color: #374151;
`

const Badge = styled.span<{ variant?: 'deposit' | 'withdraw' }>`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${props => props.variant === 'deposit' ? '#dcfce7' : '#fee2e2'};
  color: ${props => props.variant === 'deposit' ? '#166534' : '#dc2626'};
`

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  flex-wrap: wrap;
  gap: 1rem;
`

const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const PaginationButton = styled.button<{ disabled?: boolean }>`
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: ${props => props.disabled ? '#f9fafb' : '#fff'};
  color: ${props => props.disabled ? '#9ca3af' : '#374151'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #f3f4f6;
    border-color: #9ca3af;
  }
`

const PaginationInfo = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  color: #6b7280;
  font-size: 1rem;
`

const SortButton = styled.button<{ isActive?: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: ${props => props.isActive ? '#3b82f6' : '#fff'};
  color: ${props => props.isActive ? '#fff' : '#374151'};
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &:hover {
    background: ${props => props.isActive ? '#2563eb' : '#f3f4f6'};
    border-color: ${props => props.isActive ? '#2563eb' : '#9ca3af'};
  }
`

const CurrentPageBadge = styled.span`
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.875rem;
`

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
      <LoadingContainer>
        Carregando transações...
      </LoadingContainer>
    )
  }

  return (
    <Container>
      <PageHeader>
        <PageTitle>💰 Transações</PageTitle>
        <PageDescription>
          Visualize e gerencie todas as transações financeiras
        </PageDescription>
      </PageHeader>
      
      <FilterSection>
        <FilterTitle>🔍 Filtros e Busca</FilterTitle>
        
        <FilterControls hasInfo>
          <FilterGroup style={{ flex: 1, minWidth: '200px' }}>
            <FilterLabel>Buscar:</FilterLabel>
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
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Tipo:</FilterLabel>
            <FilterSelect 
              value={typeFilter} 
              onChange={(e) => setTypeFilter(e.target.value as 'all' | 'deposit' | 'withdraw')}
            >
              <option value="all">Todos</option>
              <option value="deposit">Depósitos</option>
              <option value="withdraw">Saques</option>
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Itens por página:</FilterLabel>
            <FilterSelect 
              value={state.itemsPerPage} 
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </FilterSelect>
          </FilterGroup>
        </FilterControls>
        
        <InfoSection>
          <InfoBadge>
            <strong>{totalItems}</strong> transações encontradas
          </InfoBadge>
        </InfoSection>
      </FilterSection>

      <FilterSection>
        <FilterTitle>📊 Ordenação</FilterTitle>
        <FilterControls>
            {sortOptions.map((option) => (
              <SortButton
                key={option.value}
                onClick={() => handleSortChange(option.value)}
                isActive={sortField === option.value}
              >
                {option.label}
                {sortField === option.value && (
                  <span>
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </SortButton>
            ))}
        </FilterControls>
      </FilterSection>

      <TableContainer>
        {transactions.length === 0 ? (
          <LoadingContainer>
            Nenhuma transação encontrada com os filtros aplicados.
          </LoadingContainer>
        ) : (
          <Table>
            <TableHeader>
              <tr>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>Data</TableHeaderCell>
                <TableHeaderCell>Valor</TableHeaderCell>
                <TableHeaderCell>Tipo</TableHeaderCell>
                <TableHeaderCell>Conta</TableHeaderCell>
                <TableHeaderCell>Indústria</TableHeaderCell>
                <TableHeaderCell>Estado</TableHeaderCell>
              </tr>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell>{formatAmount(transaction.amount)}</TableCell>
                  <TableCell>
                    <Badge variant={transaction.transaction_type}>
                      {transaction.transaction_type === 'deposit' ? 'Depósito' : 'Saque'}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.account}</TableCell>
                  <TableCell>{transaction.industry}</TableCell>
                  <TableCell>{transaction.state}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {totalPages > 1 && (
        <TableContainer>
          <PaginationContainer>
            <PaginationInfo>
              Página {currentPage} de {totalPages} ({totalItems} transações total)
            </PaginationInfo>
            
            <PaginationControls>
              <PaginationButton 
                onClick={goToFirstPage}
                disabled={currentPage === 1}
              >
                Primeira
              </PaginationButton>
            
              <PaginationButton 
                onClick={goToPrevPage}
                disabled={currentPage === 1}
              >
                Anterior
              </PaginationButton>
            
              <CurrentPageBadge>
                {currentPage}
              </CurrentPageBadge>
            
              <PaginationButton 
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Próxima
              </PaginationButton>
            
              <PaginationButton 
                onClick={goToLastPage}
                disabled={currentPage === totalPages}
              >
                Última
              </PaginationButton>
            </PaginationControls>
          </PaginationContainer>
        </TableContainer>
      )}
    </Container>
  )
}