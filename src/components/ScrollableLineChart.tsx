'use client'
import React, { useState, useMemo } from 'react'
import { ResponsiveLine } from '@nivo/line'
import { ChartTitle, ResponsiveWrapper } from '@/styles/components'
import styled from 'styled-components'

// Styled Components
const NavigationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`

const NavigationButton = styled.button<{ disabled?: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: ${props => props.disabled ? '#f9fafb' : '#fff'};
  color: ${props => props.disabled ? '#9ca3af' : '#374151'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #f3f4f6;
    border-color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`

const WindowInfo = styled.div`
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`

interface ScrollableLineChartProps {
  data: Array<{
    x: string | number
    y: number
    dateKey?: string
  }>
  title?: string
  windowSize?: number
}

export default function ScrollableLineChart({ 
  data, 
  title = "Evolução Temporal",
  windowSize = 20 
}: ScrollableLineChartProps) {
  const [currentWindow, setCurrentWindow] = useState(0)
  
  const totalWindows = Math.ceil(data.length / windowSize)
  const startIndex = currentWindow * windowSize
  const endIndex = Math.min(startIndex + windowSize, data.length)
  
  const windowData = useMemo(() => {
    const slicedData = data.slice(startIndex, endIndex)
    return [
      {
        id: 'transações',
        color: '#4CAF50',
        data: slicedData.map(item => ({
          x: item.x,
          y: item.y
        }))
      }
    ]
  }, [data, startIndex, endIndex])

  const windowInfo = useMemo(() => {
    if (data.length === 0) return { start: '', end: '', count: 0 }
    
    const startItem = data[startIndex]
    const endItem = data[endIndex - 1]
    
    return {
      start: startItem?.x || '',
      end: endItem?.x || '',
      count: endIndex - startIndex
    }
  }, [data, startIndex, endIndex])

  const goToWindow = (windowIndex: number) => {
    if (windowIndex >= 0 && windowIndex < totalWindows) {
      setCurrentWindow(windowIndex)
    }
  }

  if (data.length === 0) {
    return (
      <div style={{ textAlign: 'center', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Nenhum dado disponível para exibir</p>
      </div>
    )
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <ChartTitle>{title}</ChartTitle>
      
      <NavigationContainer>
        <NavigationButton 
          onClick={() => goToWindow(0)} 
          disabled={currentWindow === 0}
        >
          ⏮️ Primeira
        </NavigationButton>
        <NavigationButton 
          onClick={() => goToWindow(currentWindow - 1)} 
          disabled={currentWindow === 0}
        >
          ◀️ Anterior
        </NavigationButton>
        <WindowInfo>
          {currentWindow + 1} / {totalWindows}
        </WindowInfo>
        <NavigationButton 
          onClick={() => goToWindow(currentWindow + 1)} 
          disabled={currentWindow === totalWindows - 1}
        >
          Próximo ▶️
        </NavigationButton>
        <NavigationButton 
          onClick={() => goToWindow(totalWindows - 1)} 
          disabled={currentWindow === totalWindows - 1}
        >
          Última ⏭️
        </NavigationButton>
      </NavigationContainer>

      <ResponsiveWrapper height="400px">
        <ResponsiveLine
          data={windowData}
          margin={{ top: 50, right: 110, bottom: 80, left: 80 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
          }}
          yFormat={(value) => `R$${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: 'Data',
            legendOffset: 50,
            legendPosition: 'middle'
          }}
          axisLeft={{
            format: (value) => `R$${value.toLocaleString('pt-BR')}`,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Valor (R$)',
            legendOffset: -60,
            legendPosition: 'middle'
          }}
          pointSize={8}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          animate={true}
          motionConfig="gentle"
        />
      </ResponsiveWrapper>
    </div>
  )
}
