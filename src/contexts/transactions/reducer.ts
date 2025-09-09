import { TransactionsState, TransactionsAction } from './types'

export const transactionsReducer = (
  state: TransactionsState, 
  action: TransactionsAction
): TransactionsState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }

    case 'SET_TRANSACTIONS':
      return { 
        ...state, 
        transactions: action.payload,
        totalItems: action.payload.length
      }

    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }

    case 'SET_PAGE':
      return { ...state, currentPage: action.payload }

    case 'SET_ITEMS_PER_PAGE':
      return { 
        ...state, 
        itemsPerPage: action.payload,
        currentPage: 1
      }

    case 'SET_SORT':
      return { 
        ...state, 
        sortField: action.payload.field,
        sortOrder: action.payload.order,
        currentPage: 1
      }

    case 'SET_SEARCH':
      return { 
        ...state, 
        searchTerm: action.payload,
        currentPage: 1
      }

    case 'SET_TYPE_FILTER':
      return { 
        ...state, 
        typeFilter: action.payload,
        currentPage: 1
      }

    case 'APPLY_FILTERS':
      let filtered = [...state.transactions]

      if (state.searchTerm) {
        const searchLower = state.searchTerm.toLowerCase()
        filtered = filtered.filter(transaction => 
          transaction.account.toLowerCase().includes(searchLower) ||
          transaction.industry.toLowerCase().includes(searchLower) ||
          transaction.state.toLowerCase().includes(searchLower) ||
          transaction.currency.toLowerCase().includes(searchLower) ||
          transaction.amount.toString().includes(searchLower) ||
          transaction.id.toString().includes(searchLower)
        )
      }

      if (state.typeFilter !== 'all') {
        filtered = filtered.filter(transaction => 
          transaction.transaction_type === state.typeFilter
        )
      }

      filtered.sort((a, b) => {
        let aValue: string | number = a[state.sortField]
        let bValue: string | number = b[state.sortField]

        if (state.sortField === 'amount') {
          aValue = parseFloat(String(aValue))
          bValue = parseFloat(String(bValue))
        } else if (state.sortField === 'date' || state.sortField === 'id') {
          aValue = Number(aValue)
          bValue = Number(bValue)
        } else {
          aValue = String(aValue).toLowerCase()
          bValue = String(bValue).toLowerCase()
        }

        if (aValue < bValue) return state.sortOrder === 'asc' ? -1 : 1
        if (aValue > bValue) return state.sortOrder === 'asc' ? 1 : -1
        return 0
      })

      const totalPages = Math.ceil(filtered.length / state.itemsPerPage)

      return {
        ...state,
        filteredTransactions: filtered,
        totalPages,
        totalItems: filtered.length
      }

    default:
      return state
  }
}
