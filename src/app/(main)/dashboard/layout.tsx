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
    <div className="flex w-full justify-end ">
      <div className=" w-2/3 pr-4">
        {EventCard}
        {MetricCards}
        {AttendanceOverview}
      </div>
      <div className="w-1/3 h-full flex flex-col gap-4">
        {SessionCalendar }
        {children}
      </div>
    </div>
  );
}
