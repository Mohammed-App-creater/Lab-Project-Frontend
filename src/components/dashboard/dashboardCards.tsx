"use client";
import { useEffect, useState } from "react";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import { Users, Layers, Calendar, BarChart2 } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change: {
    value: number;
    trend: "up" | "down";
  };
  icon: React.ReactNode;
  lastUpdated: string;
}

function MetricCard({
  title,
  value,
  change,
  icon,
  lastUpdated,
}: MetricCardProps) {
  return (
    <div className="rounded-lg border px-4 py-9 m-3 shadow-sm">
      <div className="flex items-center">
        {icon}
        <div className="text-sm font-medium text-gray-500 pl-4">{title}</div>
      </div>
      <div className="mt-2 flex items-baseline justify-between">
        <h3 className="text-3xl font-bold">{value}</h3>
        <span
          className={`ml-2 flex items-center text-xs font-medium ${
            change.trend === "up" ? "text-green-500" : "text-red-500"
          }`}
        >
          {change.trend === "up" ? (
            <div className="flex items-center gap-1 w-[54px] rounded-[5px] p-[5px] mb-3 bg-[#30BE821A]">
              <TbTriangleFilled className="h-3 w-3 text-green-400" />
              {change.value}%
            </div>
          ) : (
            <div className="flex items-center gap-1 w-[54px] rounded-[5px] p-[5px] mb-3 bg-[#F45B691A]">
              <TbTriangleInvertedFilled className="h-3 w-3 text-red-500" />
              {change.value}%
            </div>
          )}
        </span>
      </div>
      <hr />
      <div className="mt-2 text-xs text-gray-400">Updated: {lastUpdated}</div>
    </div>
  );
}

export default function MetricCardsClient() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}api/dashboard/summary`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setMetrics(data.data);
    };
    fetchMetrics();
  }, []);

  if (!metrics) return <div>Loading...</div>;

  const { totalDivisions, totalMembers, attendanceRate, upcomingSessions } = metrics;

  const metricsArr = [
    {
      title: "Total Members",
      value: totalMembers,
      change: { value: 12, trend: "up" as "up" },
      icon: <Users className="h-5 w-5 text-indigo-600" />,
      lastUpdated: new Date().toLocaleDateString(),
    },
    {
      title: "Total Divisions",
      value: totalDivisions,
      change: { value: 9, trend: "up" as "up" },
      icon: <Layers className="h-5 w-5 text-purple-600" />,
      lastUpdated: new Date().toLocaleDateString(),
    },
    {
      title: "Attendance Rate",
      value: `${attendanceRate}%`,
      change: { value: 4, trend: "down" as "down" },
      icon: <BarChart2 className="h-5 w-5 text-blue-600" />,
      lastUpdated: new Date().toLocaleDateString(),
    },
    {
      title: "Upcoming Sessions",
      value: upcomingSessions,
      change: { value: 15, trend: "up" as "up" },
      icon: <Calendar className="h-5 w-5 text-blue-600" />,
      lastUpdated: new Date().toLocaleDateString(),
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
      {metricsArr.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </div>
  );
}
