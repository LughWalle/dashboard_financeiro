'use client'
import React, { useState, useMemo } from 'react'
import { ResponsiveLine } from '@nivo/line'

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
      <h3>{title}</h3>
      
      <div style={{ 
        marginBottom: '20px', 
        padding: '15px', 
        backgroundColor: '#e3f2fd', 
        borderRadius: '8px',
        border: '1px solid #bbdefb'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ fontSize: '14px', color: '#1565c0' }}>
            <strong>Período:</strong> {windowInfo.start} → {windowInfo.end}
          </div>
          <div style={{ fontSize: '14px', color: '#1565c0' }}>
            <strong>{windowInfo.count}</strong> pontos | Janela {currentWindow + 1} de {totalWindows}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
          <button onClick={() => goToWindow(0)} disabled={currentWindow === 0}>
            ⏮️ Primeira
          </button>
          <button onClick={() => goToWindow(currentWindow - 1)} disabled={currentWindow === 0}>
            ◀️ Anterior
          </button>
          <div style={{ padding: '8px 16px', backgroundColor: '#1976d2', color: '#fff', borderRadius: '4px', fontWeight: 'bold' }}>
            {currentWindow + 1} / {totalWindows}
          </div>
          <button onClick={() => goToWindow(currentWindow + 1)} disabled={currentWindow === totalWindows - 1}>
            Próximo ▶️
          </button>
          <button onClick={() => goToWindow(totalWindows - 1)} disabled={currentWindow === totalWindows - 1}>
            Última ⏭️
          </button>
        </div>
      </div>

      <div style={{ height: 400 }}>
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
      </div>
    </div>
  )
}
