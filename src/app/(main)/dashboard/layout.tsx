import type React from "react"

export default function dashboardLayout({
  children,
  EventCard,
  MetricCards,
  AttendanceOverview,
  SessionCalendar,
}: {
  children: React.ReactNode
  EventCard: React.ReactNode
  MetricCards: React.ReactNode
  AttendanceOverview: React.ReactNode
  SessionCalendar: React.ReactNode
}) {
  return (
    <div className="flex flex-col pr-5 pl-2 lg:flex-row sm:ml-10 w-full gap-5 ">
      {/* Left section (EventCard, MetricCards, Attendance) */}
      <div className="pl-10 lg:pl-3 flex flex-col gap-4">
        {EventCard}
        {MetricCards}
        {AttendanceOverview}
      </div>

      {/* Right section (SessionCalendar, children) */}
        {SessionCalendar}

    </div>
  )
}
