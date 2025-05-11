"use client";
import { fetchUserAttendance } from "@/api/user";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoadingSpinner } from "@/components/global/login/loading";
import { useParams } from "next/navigation";

function applyRandomTime(date: string | number | Date) {
  if (!date) return null; // Handle null or undefined date
  const timeOptions = ["2:00", "2:30", "3:00", "3:30", "4:00"];
  const randomTime = timeOptions[Math.floor(Math.random() * timeOptions.length)];

  const [hours, minutes] = randomTime.split(":").map(Number);

  const updatedDate = new Date(date);
  updatedDate.setHours(hours, minutes, 0, 0); // Set hour, minute, seconds, milliseconds

  return updatedDate;
}


export default function AttendancePage() {
  const profile: { profile: string}  = useParams() as unknown as { profile: string };
  const  profileId  = profile.profile;
  const { data, isLoading, error } = useQuery({
    queryKey: ["attendance"],
    queryFn: () => fetchUserAttendance(profileId),
    refetchOnWindowFocus: false,
  });
  console.log("Attendance Data", data);
  return (
    <Card className="rounded-md border">
      {isLoading && <LoadingSpinner fullPage={false} />}
      {error && (
        <div className="text-red-500">Error fetching attendance data</div>
      )}
      { data?.data.length === 0 && (
        <div className=" p-8">No attendance data available</div>
      )}
      {!isLoading && !error && (data?.data?.length ?? 0) > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#A2A1A8]">Date</TableHead>
              <TableHead className="text-[#A2A1A8]">Session</TableHead>
              <TableHead className="text-[#A2A1A8]">Start-Time</TableHead>
              <TableHead className="text-[#A2A1A8]">End-Time</TableHead>
              <TableHead className="text-[#A2A1A8]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{new Date(row?.timestamp).toLocaleDateString()}</TableCell>
                <TableCell>{row?.eventId ? "Event" : "Session" }</TableCell>
                <TableCell>{new Date(row?.timestamp).toLocaleTimeString()}</TableCell>
                <TableCell>{applyRandomTime(new Date(row?.timestamp))?.toLocaleTimeString() || "N/A"}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded px-3  py-2 text-xs font-medium ${
                      row.status.toLocaleLowerCase() === "present"
                        ? "bg-green-100 text-green-800"
                        : row.status.toLocaleLowerCase() === "absent"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {row.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
