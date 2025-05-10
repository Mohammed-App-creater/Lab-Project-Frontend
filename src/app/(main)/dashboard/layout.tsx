export default function DashboardLayout({
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
    <div className="w-full h-screen max-w-full ">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left section - Main content */}
        <div className="space-y-4 sm:space-y-6 lg:col-span-8">
          {EventCard}
          {MetricCards}
          {AttendanceOverview}
        </div>

        {/* Right section - Calendar */}
        <div className="lg:col-span-4 ">
          {SessionCalendar}
        </div>
      </div>
    </div>
  );
}
