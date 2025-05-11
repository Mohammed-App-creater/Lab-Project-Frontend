"use client";
import { Card } from "@/components/ui/card";
import { fetchAttendanceRatio } from "@/api/user";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/global/login/loading";
import { use } from "react";

export default function ProgressPage({ params }: { params: Promise<{ profile: string }> }) {
  const Params = use(params);
  const { profile } = Params;
  console.log("Profile:", profile);
  const {
    data: attendanceRatio,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["attendanceRatio"],
    queryFn: () => fetchAttendanceRatio(profile),
  });
  
  return (
    <main className="flex-1 overflow-y-auto p-4 w-[1030px]">
        {isLoading && <LoadingSpinner fullPage={false} />}
        {error && (
        <div className="flex items-center justify-center h-full">
          <p className="text-red-500">Error: {String(error)}</p>
        </div>
        )}
        {!isLoading && !error && !attendanceRatio && (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No attendance ratio available.</p>
        </div>
        )}
        {!isLoading && !error && attendanceRatio && (
        <div className="flex gap-6 mt-5">
          <div className="flex-1">
          <div className="grid gap-6">
            <Card className="p-6 max-w-md border-2 border-gray-200 mx-auto -ml-1">
            <h2 className="text-lg font-bold mb-6">
              Overall Attendance Progress
            </h2>

            <div className="flex justify-center mb-8">
              <div className="relative w-40 h-40">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                className="text-blue-100 stroke-current"
                strokeWidth="10"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                />
                <circle
                className="text-blue-900 stroke-current"
                strokeWidth="10"
                strokeLinecap="round"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                strokeDasharray="251.2"
                strokeDashoffset="62.8"
                transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">
                {attendanceRatio?.data?.attendanceRate.toFixed(2) || 0}%
                </span>
              </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
              <p className="text-2xl font-bold">
                {attendanceRatio?.data?.lastWeekAttendanceRate || 0}%
              </p>
              <p className="text-sm text-gray-500">Last week</p>
              </div>
              <div>
              <p className="text-2xl font-bold">
                {attendanceRatio?.data?.lastMonthAttendanceRate || 0}%
              </p>
              <p className="text-sm text-gray-500">Last month</p>
              </div>
            </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              value="0"
              label="Heads up"
              percentage={attendanceRatio?.data?.headsUp || 0}
              color="blue-900"
            />
            <StatCard
              value="3"
              label="Absent"
              percentage={attendanceRatio?.data?.absent || 0}
              color="blue-900"
            />
            <StatCard
              value="7"
              label="Present"
              percentage={attendanceRatio?.data?.present || 0}
              color="blue-900"
            />
            </div>
          </div>
          </div>
        </div>
        )}
      </main>
  );
}

interface StatCardProps {
  value: string;
  label: string;
  percentage: number;
  color: string;
}

function StatCard({ value, label, percentage, color }: StatCardProps) {
  return (
    <Card className="p-4 flex flex-row items-center border-2 border-gray-200">
      <div className="relative w-28 h-28 mr-4">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className=" text-blue-100 stroke-current"
            strokeWidth="10"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
          />
          <circle
            className={`text-${color} stroke-current`}
            strokeWidth="10"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            strokeDasharray="251.2"
            strokeDashoffset={251.2 * (1 - percentage / 100)}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold">{percentage}%</span>
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </Card>
  );
}
