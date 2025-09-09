'use client'
import { createContext } from 'react'
import { TransactionsContextType } from './types'

export const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined)
