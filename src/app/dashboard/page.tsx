'use client'
import React from 'react'
import TransactionsList from '@/components/TransactionsList'
import AreaCharts from '@/components/AreaCharts'

export default function Dashboard() {
  return (
    <>
      <h2>informações financeiras</h2>
      <AreaCharts />
      <TransactionsList />
    </>
  )
}
