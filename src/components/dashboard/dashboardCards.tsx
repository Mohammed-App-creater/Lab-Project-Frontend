import type React from "react"
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb"
import { Users, Layers, Calendar, BarChart2 } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  change: {
    value: number
    trend: "up" | "down"
  }
  icon: React.ReactNode
  lastUpdated: string
}

function MetricCard({ title, value, change, icon, lastUpdated }: MetricCardProps) {
  return (
    <div className="rounded-lg border p-4 m-3 shadow-sm">
      <div className="flex items-center">
      {icon}
        <div className="text-sm font-medium text-gray-500 pl-4">{title}</div>
      </div>
      <div className="mt-2 flex items-baseline justify-between">
        <h3 className="text-3xl font-bold">{value}</h3>
        <span
          className={`ml-2 flex items-center text-xs font-medium${
            change.trend === "up" ? "text-green-500" : "text-red-500"
          }`}
        >
          {change.trend === "up" ? (
            <div className="flex items-center gap-1 w-[54px] rounded-[5px] p-[5px] mb-3 bg-[#30BE821A]">
              <TbTriangleFilled className="mr-0.5 h-3 w-3 text-green-400 " />
          {change.value}%
          </div>
            
          ) : (
            <div className="flex items-center gap-1 w-[54px] rounded-[5px] p-[5px] mb-3 bg-[#F45B691A]">
              <TbTriangleInvertedFilled className="mr-0.5 h-3 w-3 text-red-500" />
          {change.value}%
          </div>
            
          )}
           {/* {change.trend === "up"} ?  (<div className="bg-[#30BE821A]">
          {change.value}%
          </div>) : (<div className="bg-[#F45B69]">
          {change.value}%
          </div>) */}
        </span>
      </div>
      <hr />
      <div className="mt-2 text-xs text-gray-400">Updated: {lastUpdated}</div>
    </div>
  )
}

export function MetricCards() {
  const metrics = [
    {
      title: "Total Members",
      value: 162,
      change: { value: 12, trend: "up" as const },
      icon: <Users className="h-5 w-5 text-indigo-600" />,
      lastUpdated: "July 14, 2023",
    },
    {
      title: "Total Divisions",
      value: 5,
      change: { value: 9, trend: "up" as const },
      icon: <Layers className="h-5 w-5 text-purple-600" />,
      lastUpdated: "July 14, 2023",
    },
    {
      title: "Attendance Rate",
      value: "68%",
      change: { value: 4, trend: "down" as const },
      icon: <BarChart2 className="h-5 w-5 text-blue-600" />,
      lastUpdated: "July 14, 2023",
    },
    {
      title: "Upcoming Sessions",
      value: 12,
      change: { value: 15, trend: "up" as const },
      icon: <Calendar className="h-5 w-5 text-blue-600" />,
      lastUpdated: "July 14, 2023",
    },
  ]

  return (
    <div className="grid grid-gap-4 sm:grid-cols-2 lg:grid-cols-2">
      {metrics.map((metric) => (
        <MetricCard
          key={metric.title}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          icon={metric.icon}
          lastUpdated={metric.lastUpdated}
        />
      ))}
    </div>
  )
}

