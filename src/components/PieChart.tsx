'use client'
import React from 'react'
import { ResponsivePie } from '@nivo/pie'

interface PieChartProps {
  data: Array<{
    x: string
    y: number
  }>
  title?: string
}

const colors = ["#4CAF50", "#e74c3c", "#3498db", "#f39c12", "#9b59b6"]

export default function PieChart({ data, title = "Distribuição" }: PieChartProps) {
  // Converter dados para o formato do Nivo
  const nivoData = data.map((item, index) => ({
    id: item.x,
    label: item.x,
    value: item.y,
    color: colors[index % colors.length]
  }))

  return (
    <div style={{ textAlign: 'center', height: 400 }}>
      <h3>{title}</h3>
      <div style={{ height: 350 }}>
        <ResponsivePie
          data={nivoData}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={{ scheme: 'nivo' }}
          borderWidth={1}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 0.2]]
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: 'color',
            modifiers: [['darker', 2]]
          }}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#999',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'circle'
            }
          ]}
        />
      </div>
    </div>
  )
}
