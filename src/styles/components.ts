import styled from "styled-components"

interface StyledProps {
  variant?: 'pie' | 'bar' | 'line' | 'type' | 'account' | 'industry' | 'state' | 'period'
  background?: string
  color?: string
  borderColor?: string
  hasInfo?: boolean
}

// Container principal
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`

// Seção de filtros
export const FilterSection = styled.div<{ variant?: 'pie' | 'bar' | 'line' }>`
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: ${props => {
    switch (props.variant) {
      case 'pie': return '#fff3e0';
      case 'bar': return '#e8f5e9';
      case 'line': return '#f8f9fa';
      default: return '#f8f9fa';
    }
  }};
  border-radius: 8px;
  border: 1px solid ${props => {
    switch (props.variant) {
      case 'pie': return '#ffcc02';
      case 'bar': return '#4caf50';
      case 'line': return '#dee2e6';
      default: return '#dee2e6';
    }
  }};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`

// Título da seção de filtros
export const FilterTitle = styled.h3<{ variant?: 'pie' | 'bar' | 'line' }>`
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => {
    switch (props.variant) {
      case 'pie': return '#e65100';
      case 'bar': return '#2e7d32';
      case 'line': return '#495057';
      default: return '#495057';
    }
  }};
`

// Container dos controles de filtro
export const FilterControls = styled.div.withConfig({
  shouldForwardProp: (prop) => !['hasInfo'].includes(prop),
})<{ hasInfo?: boolean }>`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: ${props => props.hasInfo ? '1rem' : '0'};
`

// Grupo de filtro individual
export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 150px;
`

// Label do filtro
export const FilterLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: #495057;
`

// Select do filtro
export const FilterSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background: white;
  font-size: 0.9rem;
  color: #495057;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`

// Seção de informações
export const InfoSection = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
`

// Badge de informação
export const InfoBadge = styled.div.withConfig({
  shouldForwardProp: (prop) => !['variant', 'background', 'color', 'borderColor'].includes(prop),
})<StyledProps>`
  padding: 0.5rem 1rem;
  background: ${props => props.background || '#e9ecef'};
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  color: ${props => props.color || '#495057'};
  border: 1px solid ${props => props.borderColor || '#dee2e6'};
`

// Tag de filtro
export const FilterTag = styled.span.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})<StyledProps>`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  background: ${props => {
    switch (props.variant) {
      case 'type': return '#d1ecf1';
      case 'period': return '#d4edda';
      case 'account': return '#fff3cd';
      case 'industry': return '#f8d7da';
      case 'state': return '#e2e3e5';
      default: return '#e2e3e5';
    }
  }};
  color: ${props => {
    switch (props.variant) {
      case 'type': return '#0c5460';
      case 'period': return '#155724';
      case 'account': return '#856404';
      case 'industry': return '#721c24';
      case 'state': return '#383d41';
      default: return '#383d41';
    }
  }};
  border: 1px solid ${props => {
    switch (props.variant) {
      case 'type': return '#bee5eb';
      case 'period': return '#c3e6cb';
      case 'account': return '#faeaa3';
      case 'industry': return '#f5c6cb';
      case 'state': return '#d6d8db';
      default: return '#d6d8db';
    }
  }};
`

// Cabeçalho da página
export const PageHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`

// Título da página
export const PageTitle = styled.h1`
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
`

// Descrição da página
export const PageDescription = styled.p`
  margin: 0;
  font-size: 1.1rem;
  color: #6c757d;
  line-height: 1.5;
`

// Card para gráficos
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

// ===============================
// NOVOS COMPONENTES AVANÇADOS
// ===============================

// Cards e Containers Avançados
export const Card = styled.div<{ 
  variant?: 'default' | 'elevated' | 'outlined' | 'flat'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}>`
  background: white;
  border-radius: ${props => {
    switch (props.borderRadius) {
      case 'none': return '0';
      case 'sm': return '4px';
      case 'md': return '8px';
      case 'lg': return '12px';
      case 'xl': return '16px';
      default: return '8px';
    }
  }};
  padding: ${props => {
    switch (props.padding) {
      case 'none': return '0';
      case 'sm': return '0.75rem';
      case 'md': return '1rem';
      case 'lg': return '1.5rem';
      case 'xl': return '2rem';
      default: return '1rem';
    }
  }};
  
  ${props => {
    switch (props.variant) {
      case 'elevated':
        return `
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          border: 1px solid #f3f4f6;
        `;
      case 'outlined':
        return `
          border: 2px solid #e5e7eb;
          box-shadow: none;
        `;
      case 'flat':
        return `
          box-shadow: none;
          border: none;
          background: #f9fafb;
        `;
      default:
        return `
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          border: 1px solid #e5e7eb;
        `;
    }
  }}
  
  transition: all 0.2s ease;
  
  &:hover {
    ${props => props.variant === 'elevated' ? 'transform: translateY(-2px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);' : ''}
  }
`

export const CardHeader = styled.div`
  padding-bottom: 1rem;
  border-bottom: 1px solid #f3f4f6;
  margin-bottom: 1rem;
`

export const CardTitle = styled.h3<{ size?: 'sm' | 'md' | 'lg' }>`
  margin: 0;
  font-weight: 600;
  color: #1f2937;
  font-size: ${props => {
    switch (props.size) {
      case 'sm': return '1rem';
      case 'md': return '1.125rem';
      case 'lg': return '1.25rem';
      default: return '1.125rem';
    }
  }};
`

export const CardDescription = styled.p`
  margin: 0.25rem 0 0 0;
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.4;
`

export const CardContent = styled.div`
  flex: 1;
`

export const CardFooter = styled.div`
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

// Botões Avançados
export const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => !['variant', 'size', 'fullWidth', 'loading'].includes(prop),
})<{
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'ghost' | 'link'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
  loading?: boolean
  disabled?: boolean
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: ${props => props.disabled || props.loading ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  
  ${props => props.fullWidth ? 'width: 100%;' : ''}
  
  // Tamanhos
  ${props => {
    switch (props.size) {
      case 'xs':
        return 'padding: 0.25rem 0.5rem; font-size: 0.75rem; min-height: 1.5rem;';
      case 'sm':
        return 'padding: 0.375rem 0.75rem; font-size: 0.875rem; min-height: 2rem;';
      case 'md':
        return 'padding: 0.5rem 1rem; font-size: 0.875rem; min-height: 2.5rem;';
      case 'lg':
        return 'padding: 0.75rem 1.5rem; font-size: 1rem; min-height: 3rem;';
      case 'xl':
        return 'padding: 1rem 2rem; font-size: 1.125rem; min-height: 3.5rem;';
      default:
        return 'padding: 0.5rem 1rem; font-size: 0.875rem; min-height: 2.5rem;';
    }
  }}
  
  // Variantes de cor
  ${props => {
    if (props.disabled || props.loading) {
      return `
        opacity: 0.5;
        background: #f3f4f6;
        color: #9ca3af;
        border: 1px solid #e5e7eb;
      `;
    }
    
    switch (props.variant) {
      case 'primary':
        return `
          background: #3b82f6;
          color: white;
          border: 1px solid #3b82f6;
          &:hover { background: #2563eb; border-color: #2563eb; }
          &:focus { box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
        `;
      case 'secondary':
        return `
          background: #6b7280;
          color: white;
          border: 1px solid #6b7280;
          &:hover { background: #4b5563; border-color: #4b5563; }
          &:focus { box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.1); }
        `;
      case 'success':
        return `
          background: #10b981;
          color: white;
          border: 1px solid #10b981;
          &:hover { background: #059669; border-color: #059669; }
          &:focus { box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1); }
        `;
      case 'danger':
        return `
          background: #ef4444;
          color: white;
          border: 1px solid #ef4444;
          &:hover { background: #dc2626; border-color: #dc2626; }
          &:focus { box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1); }
        `;
      case 'warning':
        return `
          background: #f59e0b;
          color: white;
          border: 1px solid #f59e0b;
          &:hover { background: #d97706; border-color: #d97706; }
          &:focus { box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1); }
        `;
      case 'info':
        return `
          background: #06b6d4;
          color: white;
          border: 1px solid #06b6d4;
          &:hover { background: #0891b2; border-color: #0891b2; }
          &:focus { box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1); }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: #374151;
          border: 1px solid #d1d5db;
          &:hover { background: #f9fafb; border-color: #9ca3af; }
          &:focus { box-shadow: 0 0 0 3px rgba(156, 163, 175, 0.1); }
        `;
      case 'link':
        return `
          background: transparent;
          color: #3b82f6;
          border: none;
          padding: 0;
          min-height: auto;
          text-decoration: underline;
          &:hover { color: #2563eb; }
          &:focus { box-shadow: none; outline: 2px solid #3b82f6; outline-offset: 2px; }
        `;
      default:
        return `
          background: #f9fafb;
          color: #374151;
          border: 1px solid #d1d5db;
          &:hover { background: #f3f4f6; border-color: #9ca3af; }
          &:focus { box-shadow: 0 0 0 3px rgba(156, 163, 175, 0.1); }
        `;
    }
  }}
  
  &:focus {
    outline: none;
  }
`

export const ButtonGroup = styled.div<{ orientation?: 'horizontal' | 'vertical' }>`
  display: flex;
  flex-direction: ${props => props.orientation === 'vertical' ? 'column' : 'row'};
  
  ${Button} {
    ${props => props.orientation === 'vertical' ? `
      border-radius: 0;
      &:first-child { border-top-left-radius: 6px; border-top-right-radius: 6px; }
      &:last-child { border-bottom-left-radius: 6px; border-bottom-right-radius: 6px; }
      &:not(:last-child) { border-bottom-width: 0; }
    ` : `
      border-radius: 0;
      &:first-child { border-top-left-radius: 6px; border-bottom-left-radius: 6px; }
      &:last-child { border-top-right-radius: 6px; border-bottom-right-radius: 6px; }
      &:not(:last-child) { border-right-width: 0; }
    `}
  }
`

// Componentes de Formulário Avançados
export const FormGroup = styled.div.withConfig({
  shouldForwardProp: (prop) => !['hasError'].includes(prop),
})<{ hasError?: boolean }>`
  margin-bottom: 1rem;
  
  ${props => props.hasError ? `
    ${FormLabel} { color: #ef4444; }
    ${Input}, ${TextArea}, ${Select} { 
      border-color: #ef4444; 
      &:focus { 
        border-color: #ef4444; 
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1); 
      }
    }
  ` : ''}
`

export const FormLabel = styled.label<{ required?: boolean }>`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  color: #374151;
  
  ${props => props.required ? `
    &:after {
      content: ' *';
      color: #ef4444;
    }
  ` : ''}
`

export const Input = styled.input.withConfig({
  shouldForwardProp: (prop) => !['size', 'hasError'].includes(prop),
})<{ 
  size?: 'sm' | 'md' | 'lg'
  hasError?: boolean
}>`
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #374151;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  
  ${props => {
    switch (props.size) {
      case 'sm': return 'padding: 0.375rem 0.75rem; min-height: 2rem;';
      case 'md': return 'padding: 0.5rem 0.75rem; min-height: 2.5rem;';
      case 'lg': return 'padding: 0.75rem 1rem; min-height: 3rem;';
      default: return 'padding: 0.5rem 0.75rem; min-height: 2.5rem;';
    }
  }}
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &:disabled {
    background: #f9fafb;
    color: #9ca3af;
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`

export const TextArea = styled.textarea.withConfig({
  shouldForwardProp: (prop) => !['size', 'resize'].includes(prop),
})<{ 
  size?: 'sm' | 'md' | 'lg'
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}>`
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #374151;
  font-size: 0.875rem;
  font-family: inherit;
  transition: all 0.2s ease;
  resize: ${props => props.resize || 'vertical'};
  
  ${props => {
    switch (props.size) {
      case 'sm': return 'padding: 0.375rem 0.75rem; min-height: 4rem;';
      case 'md': return 'padding: 0.5rem 0.75rem; min-height: 6rem;';
      case 'lg': return 'padding: 0.75rem 1rem; min-height: 8rem;';
      default: return 'padding: 0.5rem 0.75rem; min-height: 6rem;';
    }
  }}
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &:disabled {
    background: #f9fafb;
    color: #9ca3af;
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`

export const Select = styled.select.withConfig({
  shouldForwardProp: (prop) => !['size'].includes(prop),
})<{ size?: 'sm' | 'md' | 'lg' }>`
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #374151;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => {
    switch (props.size) {
      case 'sm': return 'padding: 0.375rem 0.75rem; min-height: 2rem;';
      case 'md': return 'padding: 0.5rem 0.75rem; min-height: 2.5rem;';
      case 'lg': return 'padding: 0.75rem 1rem; min-height: 3rem;';
      default: return 'padding: 0.5rem 0.75rem; min-height: 2.5rem;';
    }
  }}
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &:disabled {
    background: #f9fafb;
    color: #9ca3af;
    cursor: not-allowed;
  }
`

export const FormHelperText = styled.div<{ variant?: 'default' | 'error' | 'success' }>`
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: ${props => {
    switch (props.variant) {
      case 'error': return '#ef4444';
      case 'success': return '#10b981';
      default: return '#6b7280';
    }
  }};
`

// Componentes de Layout Avançados
export const Grid = styled.div<{ 
  columns?: number | string
  gap?: string
  responsive?: boolean
}>`
  display: grid;
  grid-template-columns: ${props => {
    if (typeof props.columns === 'number') {
      return `repeat(${props.columns}, 1fr)`;
    }
    return props.columns || 'repeat(auto-fit, minmax(250px, 1fr))';
  }};
  gap: ${props => props.gap || '1rem'};
  
  ${props => props.responsive ? `
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  ` : ''}
`

export const Flex = styled.div<{
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
  align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline'
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  gap?: string
}>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: ${props => {
    switch (props.justify) {
      case 'start': return 'flex-start';
      case 'end': return 'flex-end';
      case 'center': return 'center';
      case 'between': return 'space-between';
      case 'around': return 'space-around';
      case 'evenly': return 'space-evenly';
      default: return 'flex-start';
    }
  }};
  align-items: ${props => {
    switch (props.align) {
      case 'start': return 'flex-start';
      case 'end': return 'flex-end';
      case 'center': return 'center';
      case 'stretch': return 'stretch';
      case 'baseline': return 'baseline';
      default: return 'stretch';
    }
  }};
  flex-wrap: ${props => props.wrap || 'nowrap'};
  gap: ${props => props.gap || '0'};
`

// Componentes de Feedback
export const Alert = styled.div<{
  variant?: 'info' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
}>`
  padding: ${props => {
    switch (props.size) {
      case 'sm': return '0.75rem';
      case 'md': return '1rem';
      case 'lg': return '1.25rem';
      default: return '1rem';
    }
  }};
  border-radius: 6px;
  border: 1px solid;
  font-size: 0.875rem;
  
  ${props => {
    switch (props.variant) {
      case 'success':
        return `
          background: #dcfce7;
          border-color: #16a34a;
          color: #166534;
        `;
      case 'warning':
        return `
          background: #fef3c7;
          border-color: #d97706;
          color: #92400e;
        `;
      case 'error':
        return `
          background: #fee2e2;
          border-color: #dc2626;
          color: #991b1b;
        `;
      default:
        return `
          background: #dbeafe;
          border-color: #2563eb;
          color: #1e40af;
        `;
    }
  }}
`

export const Badge = styled.span<{
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  font-weight: 500;
  
  ${props => {
    switch (props.size) {
      case 'sm': return 'padding: 0.125rem 0.5rem; font-size: 0.75rem;';
      case 'md': return 'padding: 0.25rem 0.75rem; font-size: 0.75rem;';
      case 'lg': return 'padding: 0.375rem 1rem; font-size: 0.875rem;';
      default: return 'padding: 0.25rem 0.75rem; font-size: 0.75rem;';
    }
  }}
  
  ${props => {
    switch (props.variant) {
      case 'primary':
        return 'background: #dbeafe; color: #1e40af;';
      case 'success':
        return 'background: #dcfce7; color: #166534;';
      case 'warning':
        return 'background: #fef3c7; color: #92400e;';
      case 'error':
        return 'background: #fee2e2; color: #991b1b;';
      case 'info':
        return 'background: #e0f2fe; color: #0c4a6e;';
      default:
        return 'background: #f3f4f6; color: #374151;';
    }
  }}
`

// Componentes de Navegação
export const Breadcrumb = styled.nav`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #6b7280;
`

export const BreadcrumbItem = styled.span<{ isActive?: boolean }>`
  color: ${props => props.isActive ? '#374151' : '#6b7280'};
  font-weight: ${props => props.isActive ? '500' : '400'};
  
  &:not(:last-child):after {
    content: '/';
    margin: 0 0.5rem;
    color: #d1d5db;
  }
  
  a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      color: #374151;
    }
  }
`

export const Tabs = styled.div`
  border-bottom: 1px solid #e5e7eb;
`

export const TabsList = styled.div`
  display: flex;
  gap: 0;
`

export const Tab = styled.button.withConfig({
  shouldForwardProp: (prop) => !['isActive'].includes(prop),
})<{ isActive?: boolean }>`
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  color: ${props => props.isActive ? '#3b82f6' : '#6b7280'};
  font-weight: ${props => props.isActive ? '600' : '500'};
  font-size: 0.875rem;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.isActive ? '#3b82f6' : 'transparent'};
  transition: all 0.2s ease;
  
  &:hover {
    color: #3b82f6;
    background: #f9fafb;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`

export const TabContent = styled.div`
  padding: 1rem 0;
`