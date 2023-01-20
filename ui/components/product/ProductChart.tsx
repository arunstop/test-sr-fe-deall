import { ChartDataset } from "chart.js"
import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"

import { IProductList } from "@/app/products/page"
import {
    CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title,
    Tooltip
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
  scales: {
    y: {
      min: 0,
    },
  },
}
function ProductChart({ products }: { products: IProductList }) {
  const [data, setData] = useState<Map<string, number>>(new Map())
  async function getBrands(products: IProductList) {
    const data = new Map()
    products.products.map((e) => {
      const oldVal = data.get(e.brand) || 0
      data.set(e.brand, oldVal + 1)
    })
    console.log(data)
    setData(data)
  }

  const labels = Array.from(data.keys())
  const datasets: ChartDataset<"line", number[]>[] = [
    {
      label: "items",
      data: Array.from(data.values()),
      backgroundColor: "#181a2a",
    },
  ]

  useEffect(() => {
    // setData(new Map())
    getBrands(products)
    return () => {}
  }, [products.products[0].id])

  return (
    <section className="">
      {data.size && (
        <Line
          options={{
            ...options,
          }}
          data={{
            labels,
            datasets,
          }}
        />
      )}
    </section>
  )
}

export default ProductChart
