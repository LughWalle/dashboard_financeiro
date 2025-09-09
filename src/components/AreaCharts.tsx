import axios from "axios"
import { useEffect, useState } from "react"
import PieChart from "./PieChart"
import { Transaction } from "@/lib/transactionsMock"
import LineChart from "./LineChart"

const AreaCharts = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/transactions')
      console.log(response)
      setTransactions(response.data)
    }
    fetchData()
  }, [])

  const typeCount = transactions.reduce((acc: Record<string, number>, transaction: Transaction) => {
    acc[transaction.transaction_type] = (acc[transaction.transaction_type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const pieData = Object.entries(typeCount).map(([key, value]) => ({
    x: key === 'deposit' ? 'Depósitos' : 'Saques',
    y: value
  })) as Array<{
    x: string
    y: number
  }>
  const lineData = transactions.map((transaction) => {
    const date = new Date(transaction.date);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    return {
      x: formattedDate,
      y: Number(transaction.amount)
    };
  }) as Array<{
    x: string
    y: number
  }>
  return (
    <div>
      <PieChart data={pieData} />
      <LineChart data={lineData} />
    </div>
  )
}

export default AreaCharts