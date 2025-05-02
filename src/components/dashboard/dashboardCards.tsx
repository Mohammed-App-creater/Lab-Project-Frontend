"use client";

import type React from "react";
import { useQuery } from "@tanstack/react-query";
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

type DataType = {
  totalMembers: number;
  totalDivisions: number;
  attendanceRate: number;
  upcomingSessions: number;
};

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

// Do_Not_Tell_To_Anyone_Please

const fetchSummary = async (): Promise<DataType> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}api/dashboard/summary`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch summary data");
  const json = await res.json();
  return json.data;
};

export function MetricCards() {
  const { data, isError } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: fetchSummary,
  });

  if (isError || !data) return <div>Error loading metrics</div>;

  const { totalMembers, totalDivisions, attendanceRate, upcomingSessions } = data;

  const metrics = [
    {
      title: "Total Members",
      value: totalMembers,
      change: { value: 12, trend: "up" as const },
      icon: <Users className="h-5 w-5 text-indigo-600" />,
      lastUpdated: new Date().toLocaleDateString(),
    },
    {
      title: "Total Divisions",
      value: totalDivisions,
      change: { value: 9, trend: "up" as const },
      icon: <Layers className="h-5 w-5 text-purple-600" />,
      lastUpdated: new Date().toLocaleDateString(),
    },
    {
      title: "Attendance Rate",
      value: `${attendanceRate}%`,
      change: { value: 4, trend: "down" as const },
      icon: <BarChart2 className="h-5 w-5 text-blue-600" />,
      lastUpdated: new Date().toLocaleDateString(),
    },
    {
      title: "Upcoming Sessions",
      value: upcomingSessions,
      change: { value: 15, trend: "up" as const },
      icon: <Calendar className="h-5 w-5 text-blue-600" />,
      lastUpdated: new Date().toLocaleDateString(),
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
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
  );
}
