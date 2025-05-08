export default function dashboardLayout({
  children,
  EventCard,
  MetricCards,
  AttendanceOverview,
  SessionCalendar,
}: {
  children: React.ReactNode;
  EventCard: React.ReactNode;
  MetricCards: React.ReactNode;
  AttendanceOverview: React.ReactNode;
  SessionCalendar: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4">
      {/* Left section - Main content */}
      <div className="lg:col-span-3 space-y-4">
        {EventCard}
        {MetricCards}
        {AttendanceOverview}
      </div>

      {/* Right section - Calendar */}
      <div className="lg:col-span-1">
        {SessionCalendar}
      </div>
    </div>
  )
}
