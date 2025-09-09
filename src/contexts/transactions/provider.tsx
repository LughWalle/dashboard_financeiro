'use client'
import React, { useReducer, useEffect, ReactNode } from 'react'
import axios from 'axios'
import { TransactionsContext } from './context'
import { transactionsReducer } from './reducer'
import { initialState, SortField, SortOrder } from './types'
import { Transaction } from '@/lib/transactionsMock'

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsProvider: React.FC<TransactionsProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(transactionsReducer, initialState)

  const fetchTransactions = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })

      const response = await axios.get('/api/transactions')
      dispatch({ type: 'SET_TRANSACTIONS', payload: response.data })
      dispatch({ type: 'APPLY_FILTERS' })
    } catch (error) {
      console.error('Erro ao buscar transações:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Erro ao carregar transações' })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const setPage = (page: number) => {
    if (page >= 1 && page <= state.totalPages) {
      dispatch({ type: 'SET_PAGE', payload: page })
    }
  }

  const setItemsPerPage = (items: number) => {
    dispatch({ type: 'SET_ITEMS_PER_PAGE', payload: items })
    dispatch({ type: 'APPLY_FILTERS' })
  }

  const setSort = (field: SortField, order: SortOrder) => {
    dispatch({ type: 'SET_SORT', payload: { field, order } })
    dispatch({ type: 'APPLY_FILTERS' })
  }

  const setSearch = (term: string) => {
    dispatch({ type: 'SET_SEARCH', payload: term })
    dispatch({ type: 'APPLY_FILTERS' })
  }

  const setTypeFilter = (type: 'all' | 'deposit' | 'withdraw') => {
    dispatch({ type: 'SET_TYPE_FILTER', payload: type })
    dispatch({ type: 'APPLY_FILTERS' })
  }

  const getPaginatedData = (): Transaction[] => {
    const startIndex = (state.currentPage - 1) * state.itemsPerPage
    const endIndex = startIndex + state.itemsPerPage
    return state.filteredTransactions.slice(startIndex, endIndex)
  }

  const goToNextPage = () => {
    if (state.currentPage < state.totalPages) {
      setPage(state.currentPage + 1)
    }
  }

  const goToPrevPage = () => {
    if (state.currentPage > 1) {
      setPage(state.currentPage - 1)
    }
  }

  const goToFirstPage = () => setPage(1)
  const goToLastPage = () => setPage(state.totalPages)

  useEffect(() => {
    fetchTransactions()
  }, [])

  useEffect(() => {
    dispatch({ type: 'APPLY_FILTERS' })
  }, [state.sortField, state.sortOrder, state.searchTerm, state.typeFilter])

  const value = {
    state,
    dispatch,
    fetchTransactions,
    setPage,
    setItemsPerPage,
    setSort,
    setSearch,
    setTypeFilter,
    getPaginatedData,
    goToNextPage,
    goToPrevPage,
    goToFirstPage,
    goToLastPage
  }

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  )
}
