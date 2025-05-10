export default function DashboardLayout({
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
    <div className="w-full h-screen max-w-full ">
      <div className="grid grid-cols-1 lg:grid-cols-4  gap-4 sm:gap-6">
        {/* Left section - Main content */}
        <div className="space-y-4 sm:space-y-6 lg:col-span-3">
          {EventCard}
          {MetricCards}
          {AttendanceOverview}
        </div>

        {/* Right section - Calendar */}
        <div className="lg:col-span-1">
          {SessionCalendar}
        </div>
      </div>

      {/* Optional children render */}
      <div className="mt-6 sm:mt-8">{children}</div>
    </div>
  );
}
