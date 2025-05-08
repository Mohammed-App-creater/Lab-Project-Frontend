"use client";

import { useEffect, useState } from "react";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import { Users, Layers, Calendar, BarChart2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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
    <Card className="rounded-lg border w-full px-4 py-9 shadow-sm">
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
    </Card>
  );
}

function MetricCardSkeleton() {
  return (
    <Card className="rounded-lg border w-[313px] px-4 py-9 shadow-sm">
      <div className="flex items-center">
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-4 w-24 ml-4" />
      </div>
      <div className="mt-2 flex items-baseline justify-between">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-6 w-14" />
      </div>
      <hr className="my-2" />
      <Skeleton className="h-3 w-24" />
    </Card>
  );
}

export default function MetricCards() {
  const [metrics, setMetrics] = useState<MetricCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_END_URL}api/dashboard/summary`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch summary data");
        }

        const data: dataType = await response.json();
        
        const metricsData = [
          {
            title: "Total Members",
            value: data.totalMembers,
            change: { value: 12, trend: "up" as const },
            icon: <Users className="h-5 w-5 text-indigo-600" />,
            lastUpdated: new Date().toLocaleDateString(),
          },
          {
            title: "Total Divisions",
            value: data.totalDivisions,
            change: { value: 9, trend: "up" as const },
            icon: <Layers className="h-5 w-5 text-purple-600" />,
            lastUpdated: new Date().toLocaleDateString(),
          },
          {
            title: "Attendance Rate",
            value: `${data.attendanceRate}%`,
            change: { value: 4, trend: "down" as const },
            icon: <BarChart2 className="h-5 w-5 text-blue-600" />,
            lastUpdated: new Date().toLocaleDateString(),
          },
          {
            title: "Upcoming Sessions",
            value: data.upcomingSessions,
            change: { value: 15, trend: "up" as const },
            icon: <Calendar className="h-5 w-5 text-blue-600" />,
            lastUpdated: new Date().toLocaleDateString(),
          },
        ];

        setMetrics(metricsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load metrics");
        console.error("Error fetching metrics:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <MetricCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        <Card className="col-span-2 p-6 text-center">
          <p className="text-red-500">Error: {error}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
      {metricsArr.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </div>
  );
}