import AttendanceOverview from "@/components/dashboard/attendance.overview";
import EventCard from "@/components/dashboard/event.card";
import SessionCalendar from "@/components/dashboard/session.calendar";
import Login from "@/components/global/login/login";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
    <AttendanceOverview />
    <EventCard />
    <SessionCalendar />
    <Login />
  </main>
  );
}
