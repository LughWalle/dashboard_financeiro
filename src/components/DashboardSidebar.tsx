'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const menuItems = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: '📊',
      description: 'Gráficos e lista de transações'
    },
    {
      href: '/',
      label: 'Página Inicial',
      icon: '🏠',
      description: 'Voltar para a página inicial'
    }
  ]

  const handleLogout = async () => {
    try { 
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error('Erro no logout:', error)
    } finally {
      router.push('/')
    }
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '280px',
      height: '100vh',
      backgroundColor: '#1e293b',
      color: 'white',
      padding: '0',
      boxShadow: '4px 0 12px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      overflowY: 'auto'
    }}>
      <div style={{
        padding: '2rem 1.5rem 1.5rem',
        borderBottom: '1px solid #334155',
        backgroundColor: '#0f172a'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#3b82f6',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '1rem',
            fontSize: '1.5rem'
          }}>
            💼
          </div>
          <div>
            <h2 style={{ 
              margin: 0, 
              fontSize: '1.25rem', 
              fontWeight: '600',
              color: '#f1f5f9'
            }}>
              FinDash
            </h2>
            <p style={{ 
              margin: 0, 
              fontSize: '0.875rem', 
              color: '#94a3b8',
              fontWeight: '400'
            }}>
              Dashboard Financeiro
            </p>
          </div>
        </div>
      </div>

      <nav style={{ padding: '1.5rem 1rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            margin: '0 0 1rem 0.5rem',
            fontSize: '0.75rem',
            fontWeight: '600',
            color: '#64748b',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            NAVEGAÇÃO
          </h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href} style={{ marginBottom: '0.25rem' }}>
                  <Link 
                    href={item.href}
                    style={{ 
                      display: 'block',
                      padding: '0.875rem 1rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      color: isActive ? '#3b82f6' : '#e2e8f0',
                      backgroundColor: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                      border: isActive ? '1px solid rgba(59, 130, 246, 0.2)' : '1px solid transparent',
                      transition: 'all 0.2s ease',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'rgba(148, 163, 184, 0.1)'
                        e.currentTarget.style.color = '#f1f5f9'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent'
                        e.currentTarget.style.color = '#e2e8f0'
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ 
                        fontSize: '1.25rem', 
                        marginRight: '0.875rem',
                        width: '24px',
                        textAlign: 'center'
                      }}>
                        {item.icon}
                      </span>
                      <div style={{ flex: 1 }}>
                        <div style={{ 
                          fontSize: '0.925rem', 
                          fontWeight: '500',
                          marginBottom: '0.125rem'
                        }}>
                          {item.label}
                        </div>
                        <div style={{ 
                          fontSize: '0.75rem', 
                          color: isActive ? '#60a5fa' : '#94a3b8',
                          lineHeight: '1.2'
                        }}>
                          {item.description}
                        </div>
                      </div>
                    </div>
                    {isActive && (
                      <div style={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '3px',
                        height: '20px',
                        backgroundColor: '#3b82f6',
                        borderRadius: '0 2px 2px 0'
                      }} />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>

      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '1.5rem',
        borderTop: '1px solid #334155',
        backgroundColor: '#0f172a'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0.875rem',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(34, 197, 94, 0.2)'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            backgroundColor: '#22c55e',
            borderRadius: '50%',
            marginRight: '0.75rem'
          }} />
          <div>
            <div style={{
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#f1f5f9',
              marginBottom: '0.125rem'
            }}>
              Sistema Online
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: '#94a3b8'
            }}>
              Última atualização: agora
            </div>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            marginTop: '1rem',
            padding: '0.75rem',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: 'transparent',
            color: '#94a3b8',
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'
            e.currentTarget.style.color = '#ef4444'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = '#94a3b8'
          }}
        >
          <span style={{ marginRight: '0.5rem' }}>🚪</span>
          Sair do Sistema
        </button>
      </div>
    </div>
  )
}
