'use client'
import React from 'react'
import { ResponsiveBar } from '@nivo/bar'

interface BarChartProps {
  data: Array<{
    account: string
    amount: number
    formattedAmount: string
  }>
  title?: string
}

export default function BarChart({ data, title = "Top Contas" }: BarChartProps) {
  return (
    <div style={{ textAlign: 'center', height: 500 }}>
      <h3>{title}</h3>
      <div style={{ height: 450 }}>
        <ResponsiveBar
          data={data}
          keys={['amount']}
          indexBy="account"
          layout="horizontal"
          margin={{ top: 50, right: 130, bottom: 50, left: 200 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'category10' }}
          valueFormat={(value) => `R$${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 1.6]]
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Valor Total (R$)',
            legendPosition: 'middle',
            legendOffset: 32,
            format: (value) => `R$${value.toLocaleString('pt-BR')}`
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Conta',
            legendPosition: 'middle',
            legendOffset: -180
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: 'color',
            modifiers: [['darker', 1.6]]
          }}
          animate={true}
          motionConfig="gentle"
          tooltip={({ value, indexValue }) => (
            <div
              style={{
                background: 'white',
                padding: '9px 12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '12px'
              }}
            >
              <strong>{indexValue}</strong>
              <br />
              Valor: R$ {value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          )}
        />
      </div>
    </div>
  )
}
