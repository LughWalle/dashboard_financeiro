import { useState, useMemo } from "react"
import PieChart from "./PieChart"
import BarChart from "./BarChart"
import { Transaction } from "@/lib/transactionsMock"
import ScrollableLineChart from "./ScrollableLineChart"
import { useTransactions } from "@/contexts/transactions"

type FilterPeriod = 'day' | 'week' | 'month' | 'year'
type FilterType = 'all' | 'deposit' | 'withdraw'

const AreaCharts = () => {
  const { state } = useTransactions()
  const [lineFilter, setLineFilter] = useState<FilterPeriod>('month')
  const [typeFilter, setTypeFilter] = useState<FilterType>('all')
  const [selectedYear, setSelectedYear] = useState<string>('all')
  
  // Estados para filtros do PieChart
  const [pieDistribution, setPieDistribution] = useState<'type' | 'industry' | 'state'>('type')
  
  // Estados para filtros do BarChart
  const [barTypeFilter, setBarTypeFilter] = useState<FilterType>('all')
  const [barTopCount, setBarTopCount] = useState<number>(10)
 
  const transactions = state.transactions


  // Obter anos disponíveis - CORRIGIDO
  const availableYears = useMemo(() => {
    const years = new Set<number>()
    transactions.forEach(transaction => {
      const year = new Date(transaction.date).getFullYear()
      years.add(year)
    })
    const sortedYears = Array.from(years).sort((a, b) => b - a) // Mais recente primeiro
    return sortedYears
  }, [transactions])

  // Gerar dados do PieChart baseado na distribuição selecionada
  const pieData = useMemo(() => {
    const distributionCount: Record<string, number> = {}
    
    transactions.forEach(transaction => {
      let key = ''
      switch (pieDistribution) {
        case 'type':
          key = transaction.transaction_type === 'deposit' ? 'Depósitos' : 'Saques'
          break
        case 'industry':
          key = transaction.industry
          break
        case 'state':
          key = transaction.state
          break
      }
      distributionCount[key] = (distributionCount[key] || 0) + 1
    })

    return Object.entries(distributionCount).map(([key, value]) => ({
      x: key,
      y: value
    }))
  }, [transactions, pieDistribution])

  // Gerar dados do BarChart - Top Contas
  const barData = useMemo(() => {
    // Filtrar transações por tipo
    let filteredTransactions = transactions
    if (barTypeFilter !== 'all') {
      filteredTransactions = transactions.filter(t => t.transaction_type === barTypeFilter)
    }

    // Agrupar por conta e somar valores
    const accountTotals: Record<string, number> = {}
    
    filteredTransactions.forEach(transaction => {
      const amount = parseFloat(transaction.amount)
      if (!accountTotals[transaction.account]) {
        accountTotals[transaction.account] = 0
      }
      accountTotals[transaction.account] += Math.abs(amount) // Usar valor absoluto para ranking
    })

    // Converter para array, ordenar e pegar top N
    const sortedAccounts = Object.entries(accountTotals)
      .map(([account, amount]) => ({
        account,
        amount,
        formattedAmount: `R$ ${amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, barTopCount)

    return sortedAccounts
  }, [transactions, barTypeFilter, barTopCount])

  // Filtrar transações por ano se selecionado
  const filteredTransactionsByYear = useMemo(() => {
    if (selectedYear === 'all') {
      return transactions
    }
    const filtered = transactions.filter(transaction => {
      const year = new Date(transaction.date).getFullYear()
      return year.toString() === selectedYear
    })
    return filtered
  }, [transactions, selectedYear])

  // Opções de período baseadas no filtro de ano
  const getPeriodOptions = () => {
    if (selectedYear === 'all') {
      // Quando "todos os anos", só mostrar mês e ano
      return [
        { value: 'month', label: 'Mês' },
        { value: 'year', label: 'Ano' }
      ]
    } else {
      // Quando ano específico, mostrar dia, semana e mês
      return [
        { value: 'day', label: 'Dia' },
        { value: 'week', label: 'Semana' },
        { value: 'month', label: 'Mês' }
      ]
    }
  }

  // Ajustar filtro de período quando mudar o ano
  const handleYearChange = (year: string) => {
    setSelectedYear(year)
    if (year === 'all') {
      // Se mudou para "todos os anos", usar mês como padrão
      if (lineFilter === 'day' || lineFilter === 'week') {
        setLineFilter('month')
      }
    } else {
      // Se mudou para ano específico, usar mês como padrão
      setLineFilter('month')
    }
  }

  const groupDataByPeriod = (data: Transaction[], period: FilterPeriod) => {
    const grouped: Record<string, { total: number; count: number }> = {}

    data.forEach(transaction => {
      const date = new Date(transaction.date)
      let key = ''

      switch (period) {
        case 'day':
          key = date.toISOString().split('T')[0] // YYYY-MM-DD
          break
        case 'week':
          const weekStart = new Date(date)
          const dayOfWeek = weekStart.getDay()
          const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
          weekStart.setDate(weekStart.getDate() + diff)
          key = weekStart.toISOString().split('T')[0] // YYYY-MM-DD (segunda-feira)
          break
        case 'month':
          // CORRIGIDO: Usar formato que ordena corretamente
          const year = date.getFullYear()
          const month = String(date.getMonth() + 1).padStart(2, '0')
          key = `${year}-${month}-01` // YYYY-MM-01
          break
        case 'year':
          key = `${date.getFullYear()}-01-01` // YYYY-01-01
          break
      }

      if (!grouped[key]) {
        grouped[key] = { total: 0, count: 0 }
      }
      grouped[key].total += Number(transaction.amount)
      grouped[key].count += 1
    })

    return grouped
  }

  const processLineData = () => {
    let filteredTransactions = filteredTransactionsByYear
    if (typeFilter !== 'all') {
      filteredTransactions = filteredTransactionsByYear.filter(t => t.transaction_type === typeFilter)
    }

    const grouped = groupDataByPeriod(filteredTransactions, lineFilter)
    
    // CORRIGIDO: Ordenação mais robusta
    const sortedEntries = Object.entries(grouped).sort(([keyA], [keyB]) => {
      // Converter as chaves para timestamp para ordenação correta
      const dateA = new Date(keyA).getTime()
      const dateB = new Date(keyB).getTime()
      return dateA - dateB
    })
    
    
    const chartData = sortedEntries
      .map(([key, value]) => {
        const date = new Date(key)
        let formattedDate = ''

        switch (lineFilter) {
          case 'day':
            // Corrigir timezone adicionando horário
            const dayDate = new Date(key + 'T12:00:00')
            formattedDate = dayDate.toLocaleDateString('pt-BR', { 
              day: '2-digit', 
              month: '2-digit', 
              year: 'numeric' 
            })
            break
          case 'week':
            const weekDate = new Date(key + 'T12:00:00')
            const weekEnd = new Date(weekDate)
            weekEnd.setDate(weekDate.getDate() + 6)
            const startFormatted = weekDate.toLocaleDateString('pt-BR', { 
              day: '2-digit', 
              month: '2-digit', 
              year: 'numeric' 
            })
            const endFormatted = weekEnd.toLocaleDateString('pt-BR', { 
              day: '2-digit', 
              month: '2-digit', 
              year: 'numeric' 
            })
            formattedDate = `${startFormatted} - ${endFormatted}`
            break
          case 'month':
            // Corrigir timezone para formatação correta do mês
            const monthDate = new Date(key + 'T12:00:00')
            if (selectedYear === 'all') {
              // Para todos os anos, mostrar mm/aaaa
              formattedDate = monthDate.toLocaleDateString('pt-BR', { 
                month: 'short', 
                year: 'numeric' 
              })
            } else {
              // Para ano específico, mostrar nome do mês
              formattedDate = monthDate.toLocaleDateString('pt-BR', { month: 'long' })
            }
            break
          case 'year':
            const yearDate = new Date(key + 'T12:00:00')
            formattedDate = String(yearDate.getFullYear())
            break
        }

    return {
      x: formattedDate,
          y: Math.round(value.total * 100) / 100,
          dateKey: key
        }
      })

    return chartData
  }

  const lineData = processLineData()

  return (
    <div>
      {/* Filtros do Gráfico de Pizza */}
      <div style={{ 
        marginBottom: '20px', 
        padding: '15px', 
        backgroundColor: '#fff3e0', 
        borderRadius: '8px',
        border: '1px solid #ffcc02'
      }}>
        <h3 style={{ marginBottom: '15px', color: '#ef6c00' }}>🥧 Filtros do Gráfico de Pizza</h3>
        
        {/* Seletor de Distribuição */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Distribuição por:
          </label>
          <select 
            value={pieDistribution} 
            onChange={(e) => setPieDistribution(e.target.value as 'type' | 'industry' | 'state')}
            style={{
              padding: '8px 12px',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              backgroundColor: '#fff',
              fontWeight: '500'
            }}
          >
            <option value="type">Tipo de Transação</option>
            <option value="industry">Indústria</option>
            <option value="state">Estado</option>
          </select>
        </div>
      </div>

      <PieChart 
        data={pieData} 
        title={`Distribuição por ${
          pieDistribution === 'type' ? 'Tipo de Transação' :
          pieDistribution === 'industry' ? 'Indústria' : 'Estado'
        }`}
      />
      
      {/* Filtros do Gráfico de Barras */}
      <div style={{ 
        marginBottom: '20px', 
        padding: '15px', 
        backgroundColor: '#e8f5e9', 
        borderRadius: '8px',
        border: '1px solid #4caf50'
      }}>
        <h3 style={{ marginBottom: '15px', color: '#2e7d32' }}>📊 Filtros do Top Contas</h3>
        
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '15px' }}>
          {/* Filtro por Tipo */}
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Tipo:
            </label>
            <select 
              value={barTypeFilter} 
              onChange={(e) => setBarTypeFilter(e.target.value as FilterType)}
              style={{
                padding: '8px 12px',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                backgroundColor: '#fff'
              }}
            >
              <option value="all">Todos</option>
              <option value="deposit">Apenas Depósitos</option>
              <option value="withdraw">Apenas Saques</option>
            </select>
          </div>

          {/* Quantidade de Contas */}
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Top:
            </label>
            <select 
              value={barTopCount} 
              onChange={(e) => setBarTopCount(Number(e.target.value))}
              style={{
                padding: '8px 12px',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                backgroundColor: '#fff'
              }}
            >
              <option value={5}>Top 5</option>
              <option value={10}>Top 10</option>
              <option value={15}>Top 15</option>
              <option value={20}>Top 20</option>
            </select>
          </div>
        </div>

        {/* Informações sobre os dados */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ 
            padding: '8px 12px', 
            backgroundColor: '#fff', 
            borderRadius: '4px',
            fontSize: '14px',
            color: '#2e7d32',
            border: '1px solid #4caf50'
          }}>
            <strong>{barData.length}</strong> contas exibidas
          </div>
          
          {/* Indicadores de filtros ativos */}
          {barTypeFilter !== 'all' && (
            <div style={{ 
              padding: '4px 8px', 
              backgroundColor: '#4caf50', 
              color: 'white',
              borderRadius: '12px',
              fontSize: '12px'
            }}>
              {barTypeFilter === 'deposit' ? 'Depósitos' : 'Saques'}
            </div>
          )}
          
          <div style={{ 
            padding: '4px 8px', 
            backgroundColor: '#2196f3', 
            color: 'white',
            borderRadius: '12px',
            fontSize: '12px'
          }}>
            Todos os períodos
          </div>
        </div>
      </div>

      <BarChart 
        data={barData} 
        title={`Top ${barTopCount} Contas - Maiores Movimentações`}
      />
      
      <div style={{ 
        marginBottom: '20px', 
        padding: '15px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h3 style={{ marginBottom: '15px', color: '#495057' }}>Filtros do Gráfico de Linha</h3>
        
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Ano:
            </label>
            <select 
              value={selectedYear} 
              onChange={(e) => handleYearChange(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                backgroundColor: '#fff'
              }}
            >
              <option value="all">Todos os anos</option>
              {availableYears.map(year => (
                <option key={year} value={year.toString()}>{year}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Agrupar por:
            </label>
            <select 
              value={lineFilter} 
              onChange={(e) => setLineFilter(e.target.value as FilterPeriod)}
              style={{
                padding: '8px 12px',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                backgroundColor: '#fff'
              }}
            >
              {getPeriodOptions().map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Tipo:
            </label>
            <select 
              value={typeFilter} 
              onChange={(e) => setTypeFilter(e.target.value as FilterType)}
              style={{
                padding: '8px 12px',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                backgroundColor: '#fff'
              }}
            >
              <option value="all">Todos</option>
              <option value="deposit">Apenas Depósitos</option>
              <option value="withdraw">Apenas Saques</option>
            </select>
          </div>

        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>

          {selectedYear !== 'all' && (
            <div style={{ 
              padding: '8px 12px', 
              backgroundColor: '#fff3e0', 
              borderRadius: '4px',
              fontSize: '12px',
              color: '#ef6c00',
              border: '1px solid #ffcc02'
            }}>
              📅 Ano {selectedYear}
            </div>
          )}
        </div>
      </div>

      <ScrollableLineChart 
        data={lineData} 
        title="Evolução Temporal" 
        windowSize={15} 
      />
    </div>
  )
}

export default AreaCharts
