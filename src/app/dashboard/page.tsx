'use client'
import React from 'react'
import TransactionsList from '@/components/TransactionsList'
import AreaCharts from '@/components/AreaCharts'

export default function Dashboard() {
  return (
    <div>
      <div style={{ 
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '2px solid #e2e8f0'
      }}>
        <h1 style={{ 
          margin: 0,
          fontSize: '2rem',
          fontWeight: '600',
          color: '#1e293b',
          marginBottom: '0.5rem'
        }}>
          📊 Visão Geral
        </h1>
        <p style={{ 
          margin: 0,
          fontSize: '1rem',
          color: '#64748b'
        }}>
          Acompanhe suas métricas financeiras e transações em tempo real
        </p>
      </div>
      
      <AreaCharts />
      <TransactionsList />
    </div>
  )
}
