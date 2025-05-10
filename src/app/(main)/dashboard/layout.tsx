export default function dashboardLayout({
  EventCard,
  MetricCards,
  AttendanceOverview,
  SessionCalendar,
}: {
  EventCard: React.ReactNode;
  MetricCards: React.ReactNode;
  AttendanceOverview: React.ReactNode;
  SessionCalendar: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 p-4">
      {/* Left section - Main content */}
      <div className="lg:col-span-4 space-y-4">
        {EventCard}
        {MetricCards}
        {AttendanceOverview}
      </div>

      {/* Right section - Calendar */}
      <div className="lg:col-span-2 bg-amber-200">
        {SessionCalendar}
      </div>
    </div>
  )
}
