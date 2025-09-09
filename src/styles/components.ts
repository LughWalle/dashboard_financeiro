import styled from 'styled-components'

// Container principal
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

// Seção de filtros
export const FilterSection = styled.div<{ variant?: 'pie' | 'bar' | 'line' }>`
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: ${props => {
    switch (props.variant) {
      case 'pie': return '#fff3e0'
      case 'bar': return '#e8f5e9'
      case 'line': return '#f8f9fa'
      default: return '#f8f9fa'
    }
  }};
  border-radius: 8px;
  border: 1px solid ${props => {
    switch (props.variant) {
      case 'pie': return '#ffcc02'
      case 'bar': return '#4caf50'
      case 'line': return '#dee2e6'
      default: return '#dee2e6'
    }
  }};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

// Título da seção de filtros
export const FilterTitle = styled.h3<{ variant?: 'pie' | 'bar' | 'line' }>`
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => {
    switch (props.variant) {
      case 'pie': return '#ef6c00'
      case 'bar': return '#2e7d32'
      case 'line': return '#495057'
      default: return '#495057'
    }
  }};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

// Container dos controles de filtro
export const FilterControls = styled.div<{ hasInfo?: boolean }>`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: ${props => props.hasInfo ? '1rem' : '0'};
`

// Grupo individual de filtro
export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

// Label do filtro
export const FilterLabel = styled.label`
  display: block;
  font-weight: 500;
  font-size: 0.9rem;
  color: #374151;
`

// Select do filtro
export const FilterSelect = styled.select`
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #fff;
  font-size: 0.9rem;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;

  &:hover {
    border-color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`

// Seção de informações
export const InfoSection = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  align-items: center;
`

// Badge de informação
export const InfoBadge = styled.div<{ 
  background?: string
  color?: string
  borderColor?: string
  variant?: 'pie' | 'bar' | 'line'
}>`
  padding: 0.5rem 0.75rem;
  background: ${props => props.background || '#fff'};
  border-radius: 6px;
  font-size: 0.85rem;
  color: ${props => props.color || '#374151'};
  border: 1px solid ${props => props.borderColor || '#e5e7eb'};
  font-weight: 500;
`

// Tag de filtro ativo
export const FilterTag = styled.div<{ 
  background?: string
  variant?: 'type' | 'account' | 'industry' | 'state' | 'period'
}>`
  padding: 0.25rem 0.5rem;
  background: ${props => {
    if (props.background) return props.background
    switch (props.variant) {
      case 'type': return '#4caf50'
      case 'account': return '#2196f3'
      case 'industry': return '#ff9800'
      case 'state': return '#9c27b0'
      case 'period': return '#2196f3'
      default: return '#3b82f6'
    }
  }};
  color: white;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
`

// Header da página
export const PageHeader = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;
`

// Título da página
export const PageTitle = styled.h1`
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  font-weight: 600;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

// Descrição da página
export const PageDescription = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #64748b;
  line-height: 1.5;
`

// Card wrapper para gráficos
export const ChartCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  margin-bottom: 2rem;
`

// Título do gráfico
export const ChartTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  text-align: center;
`

// Wrapper responsivo
export const ResponsiveWrapper = styled.div<{ height?: string }>`
  width: 100%;
  height: ${props => props.height || '400px'};
  
  @media (max-width: 768px) {
    height: ${props => props.height ? `calc(${props.height} * 0.8)` : '320px'};
  }
`
