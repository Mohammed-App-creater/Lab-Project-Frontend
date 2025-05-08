// export default function dashboardLayout({
//   children,
//   EventCard,
//   MetricCards,
//   AttendanceOverview,
//   SessionCalendar,
// }: {
//   children: React.ReactNode;
//   EventCard: React.ReactNode;
//   MetricCards: React.ReactNode;
//   AttendanceOverview: React.ReactNode;
//   SessionCalendar: React.ReactNode;
// }) {
//   return (
//     <div className="flex w-full justify-end ">
//       <div className=" w-2/3 pr-4">
//         {EventCard}
//         {MetricCards}
//         {AttendanceOverview}
//       </div>
//       <div className="w-1/3 h-full flex flex-col gap-4">
//         {SessionCalendar }
//         {children}
//       </div>
//     </div>
//   );
// }

import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  EventCard: React.ReactNode;
  MetricCards: React.ReactNode;
  AttendanceOverview: React.ReactNode;
  SessionCalendar: React.ReactNode;
}

export default function DashboardLayout({
  children,
  EventCard,
  MetricCards,
  AttendanceOverview,
  SessionCalendar,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-full flex-col lg:flex-row w-fit">
      <div className="lg:w-2/3 lg:pr-4 mb-4 lg:mb-0">
        {EventCard}
        {MetricCards}
        {AttendanceOverview}
      </div>
      <div className="lg:w-1/3 h-full flex flex-col gap-4">
        {SessionCalendar}
        {children}
      </div>
    </div>
  );
}
