'use client'
import React from 'react'
import DashboardSidebar from '@/components/DashboardSidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <DashboardSidebar />
      <main style={{ 
        flex: 1, 
        marginLeft: '280px', 
        padding: '2rem',
        backgroundColor: '#f8f9fa',
        overflowY: 'auto'
      }}>
        {children}
      </main>
    </div>
  )
}
