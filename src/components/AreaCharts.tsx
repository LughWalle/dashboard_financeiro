import { useState, useMemo, useEffect, ChangeEvent } from "react"
import PieChart from "./PieChart"
import BarChart from "./BarChart"
import { Transaction } from "@/lib/transactionsMock"
import ScrollableLineChart from "./ScrollableLineChart"
import { useTransactions } from "@/contexts/transactions"
import {
  Container,
  FilterSection,
  FilterTitle,
  FilterControls,
  FilterGroup,
  FilterLabel,
  FilterSelect,
  InfoSection,
  InfoBadge,
  FilterTag,
  PageHeader,
  PageTitle,
  PageDescription,
  ChartCard
} from "@/styles/components"

type FilterPeriod = 'day' | 'week' | 'month' | 'year'
type FilterType = 'all' | 'deposit' | 'withdraw'

const saveToStorage = (key: string, value: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  if (typeof window !== 'undefined') {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  }
  return defaultValue
}

const AreaCharts = () => {
  const { state } = useTransactions()
  const [lineFilter, setLineFilter] = useState<FilterPeriod>(() => 
    loadFromStorage('dashboard_lineFilter', 'month')
  )
  const [typeFilter, setTypeFilter] = useState<FilterType>(() => 
    loadFromStorage('dashboard_typeFilter', 'all')
  )
  const [selectedYear, setSelectedYear] = useState<string>(() => 
    loadFromStorage('dashboard_selectedYear', 'all')
  )
  
  const [pieDistribution, setPieDistribution] = useState<'type' | 'industry' | 'state'>(() => 
    loadFromStorage('dashboard_pieDistribution', 'type')
  )
  
  const [barTypeFilter, setBarTypeFilter] = useState<FilterType>(() => 
    loadFromStorage('dashboard_barTypeFilter', 'all')
  )
  const [barTopCount, setBarTopCount] = useState<number>(() => 
    loadFromStorage('dashboard_barTopCount', 10)
  )
 
  const transactions = state.transactions

  useEffect(() => {
    saveToStorage('dashboard_lineFilter', lineFilter)
  }, [lineFilter])

  useEffect(() => {
    saveToStorage('dashboard_typeFilter', typeFilter)
  }, [typeFilter])

  useEffect(() => {
    saveToStorage('dashboard_selectedYear', selectedYear)
  }, [selectedYear])

  useEffect(() => {
    saveToStorage('dashboard_pieDistribution', pieDistribution)
  }, [pieDistribution])

  useEffect(() => {
    saveToStorage('dashboard_barTypeFilter', barTypeFilter)
  }, [barTypeFilter])

  useEffect(() => {
    saveToStorage('dashboard_barTopCount', barTopCount)
  }, [barTopCount])

  const availableYears = useMemo(() => {
    const years = new Set<number>()
    transactions.forEach(transaction => {
      const year = new Date(transaction.date).getFullYear()
      years.add(year)
    })
    const sortedYears = Array.from(years).sort((a, b) => b - a) 
    return sortedYears
  }, [transactions])

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

  const barData = useMemo(() => {
    let filteredTransactions = transactions
    if (barTypeFilter !== 'all') {
      filteredTransactions = transactions.filter(t => t.transaction_type === barTypeFilter)
    }

    const accountTotals: Record<string, number> = {}
    
    filteredTransactions.forEach(transaction => {
      const amount = parseFloat(transaction.amount)
      if (!accountTotals[transaction.account]) {
        accountTotals[transaction.account] = 0
      }
      accountTotals[transaction.account] += Math.abs(amount) 
    })

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

  const getPeriodOptions = () => {
    if (selectedYear === 'all') {
      return [
        { value: 'month', label: 'Mês' },
        { value: 'year', label: 'Ano' }
      ]
    } else {
      return [
        { value: 'day', label: 'Dia' },
        { value: 'week', label: 'Semana' },
        { value: 'month', label: 'Mês' }
      ]
    }
  }

  const handleYearChange = (year: string) => {
    setSelectedYear(year)
    if (year === 'all') {
      if (lineFilter === 'day' || lineFilter === 'week') {
        setLineFilter('month')
      }
    } else {
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
          key = date.toISOString().split('T')[0] 
          break
        case 'week':
          const weekStart = new Date(date)
          const dayOfWeek = weekStart.getDay()
          const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
          weekStart.setDate(weekStart.getDate() + diff)
          key = weekStart.toISOString().split('T')[0] 
          break
        case 'month':
          const year = date.getFullYear()
          const month = String(date.getMonth() + 1).padStart(2, '0')
          key = `${year}-${month}-01` 
          break
        case 'year':
          key = `${date.getFullYear()}-01-01` 
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
    
    const sortedEntries = Object.entries(grouped).sort(([keyA], [keyB]) => {
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
            const monthDate = new Date(key + 'T12:00:00')
            if (selectedYear === 'all') {
              formattedDate = monthDate.toLocaleDateString('pt-BR', { 
                month: 'short', 
                year: 'numeric' 
              })
            } else {
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
    <Container>
      <FilterSection variant="pie">
        <FilterTitle variant="pie">🥧 Filtros do Gráfico de Pizza</FilterTitle>
        
        <FilterControls>
          <FilterGroup>
            <FilterLabel>Distribuição por:</FilterLabel>
            <FilterSelect 
              value={pieDistribution} 
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setPieDistribution(e.target.value as 'type' | 'industry' | 'state')}
            >
              <option value="type">Tipo de Transação</option>
              <option value="industry">Indústria</option>
              <option value="state">Estado</option>
            </FilterSelect>
          </FilterGroup>
        </FilterControls>
      </FilterSection>

      <ChartCard>
        <PieChart 
          data={pieData} 
          title={`Distribuição por ${
            pieDistribution === 'type' ? 'Tipo de Transação' :
            pieDistribution === 'industry' ? 'Indústria' : 'Estado'
          }`}
        />
      </ChartCard>
      
      <FilterSection variant="bar">
        <FilterTitle variant="bar">📊 Filtros do Top Contas</FilterTitle>
        
        <FilterControls hasInfo>
          <FilterGroup>
            <FilterLabel>Tipo:</FilterLabel>
            <FilterSelect 
              value={barTypeFilter} 
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setBarTypeFilter(e.target.value as FilterType)}
            >
              <option value="all">Todos</option>
              <option value="deposit">Apenas Depósitos</option>
              <option value="withdraw">Apenas Saques</option>
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Top:</FilterLabel>
            <FilterSelect 
              value={barTopCount} 
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setBarTopCount(Number(e.target.value))}
            >
              <option value={5}>Top 5</option>
              <option value={10}>Top 10</option>
              <option value={15}>Top 15</option>
              <option value={20}>Top 20</option>
            </FilterSelect>
          </FilterGroup>
        </FilterControls>

        
        <InfoSection>
          <InfoBadge 
            variant="bar"
            background="#fff"
            color="#2e7d32"
            borderColor="#4caf50"
          >
            <strong>{barData.length}</strong> contas exibidas
          </InfoBadge>
          
          {barTypeFilter !== 'all' && (
            <FilterTag variant="type">
              {barTypeFilter === 'deposit' ? 'Depósitos' : 'Saques'}
            </FilterTag>
          )}
          
          <FilterTag variant="period">
            Todos os períodos
          </FilterTag>
        </InfoSection>
      </FilterSection>

      <ChartCard>
        <BarChart 
          data={barData} 
          title={`Top ${barTopCount} Contas - Maiores Movimentações`}
        />
      </ChartCard>
      
      <FilterSection variant="line">
        <FilterTitle variant="line">📈 Filtros do Gráfico de Linha</FilterTitle>
        
        <FilterControls hasInfo>
          <FilterGroup>
            <FilterLabel>Ano:</FilterLabel>
            <FilterSelect 
              value={selectedYear} 
              onChange={(e: ChangeEvent<HTMLSelectElement>) => handleYearChange(e.target.value)}
            >
              <option value="all">Todos os anos</option>
              {availableYears.map(year => (
                <option key={year} value={year.toString()}>{year}</option>
              ))}
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Agrupar por:</FilterLabel>
            <FilterSelect 
              value={lineFilter} 
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setLineFilter(e.target.value as FilterPeriod)}
            >
              {getPeriodOptions().map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel>Tipo:</FilterLabel>
            <FilterSelect 
              value={typeFilter} 
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setTypeFilter(e.target.value as FilterType)}
            >
              <option value="all">Todos</option>
              <option value="deposit">Apenas Depósitos</option>
              <option value="withdraw">Apenas Saques</option>
            </FilterSelect>
          </FilterGroup>
        </FilterControls>

        <InfoSection>
          <InfoBadge 
            variant="line"
            background="#fff"
            color="#495057"
            borderColor="#dee2e6"
          >
            <strong>{lineData.length}</strong> pontos disponíveis
          </InfoBadge>

          <FilterTag variant="period">
            📊 Gráfico Navegável
          </FilterTag>

          {selectedYear !== 'all' && (
            <FilterTag background="#fff3e0" style={{ color: '#ef6c00', border: '1px solid #ffcc02' }}>
              📅 Ano {selectedYear}
            </FilterTag>
          )}
        </InfoSection>
      </FilterSection>

      <ChartCard>
        <ScrollableLineChart 
          data={lineData} 
          title="Evolução Temporal" 
          windowSize={15} 
        />
      </ChartCard>
    </Container>
  )
}

export default AreaCharts
