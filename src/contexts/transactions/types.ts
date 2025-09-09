import { Transaction, SortField, SortOrder } from '@/lib/transactionsMock'

export type { SortField, SortOrder }

export interface TransactionsState {
  transactions: Transaction[]
  filteredTransactions: Transaction[]
  loading: boolean
  error: string | null
  // Paginação
  currentPage: number
  itemsPerPage: number
  totalPages: number
  totalItems: number
  // Filtros
  sortField: SortField
  sortOrder: SortOrder
  searchTerm: string
  typeFilter: 'all' | 'deposit' | 'withdraw'
}

export type TransactionsAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_TRANSACTIONS'; payload: Transaction[] }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_ITEMS_PER_PAGE'; payload: number }
  | { type: 'SET_SORT'; payload: { field: SortField; order: SortOrder } }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_TYPE_FILTER'; payload: 'all' | 'deposit' | 'withdraw' }
  | { type: 'APPLY_FILTERS' }

export interface TransactionsContextType {
  state: TransactionsState
  dispatch: React.Dispatch<TransactionsAction>
  fetchTransactions: () => Promise<void>
  setPage: (page: number) => void
  setItemsPerPage: (items: number) => void
  setSort: (field: SortField, order: SortOrder) => void
  setSearch: (term: string) => void
  setTypeFilter: (type: 'all' | 'deposit' | 'withdraw') => void
  getPaginatedData: () => Transaction[]
  goToNextPage: () => void
  goToPrevPage: () => void
  goToFirstPage: () => void
  goToLastPage: () => void
}

export const initialState: TransactionsState = {
  transactions: [],
  filteredTransactions: [],
  loading: true,
  error: null,
  currentPage: 1,
  itemsPerPage: 25,
  totalPages: 0,
  totalItems: 0,
  sortField: 'id',
  sortOrder: 'asc',
  searchTerm: '',
  typeFilter: 'all'
}
