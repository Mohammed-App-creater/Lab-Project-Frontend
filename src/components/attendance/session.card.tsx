"use client";

import type { Session } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { PlusCircleIcon } from "lucide-react";
import { split } from "lodash";

type SessionCardProps = {
  session: Session;
  onAttendanceClick: () => void;
};

export default function SessionCard({
  session,
  onAttendanceClick,
}: SessionCardProps) {
  const statusColor = {
    Ended: "text-red-500 bg-red-100",
    Planned: "text-green-500 bg-green-100",
    Ongoing: "text-yellow-500 bg-yellow-200",
    Cancelled: "text-gray-500 bg-gray-50",
  };


  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <div className="flex flex-row-reverse gap-5 items-center">
              <h1 className="text-lg font-bold ">
                {session.tags?.flatMap((tag) => split(tag, " ")).join(" ")}
              </h1>
              <Badge
                variant="outline"
                className={`${
                  statusColor[session.timeSlots?.[0]?.status || "Planned"]
                } border-0 rounded-md px-2 py-1 text-xs font-medium`}
              >
                {session.timeSlots?.[0]?.status || "Planned"}
              </Badge>
            </div>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text flex gap-1.5   text-white"
              onClick={onAttendanceClick}
            >
              <PlusCircleIcon className="mr-2 w-40 h-40" />
              <p>Attendance</p>
            </Button>
          </div>
          <h3 className="text-base sm:text-lg font-semibold">{session.title}</h3>
          <p className="text-sm text-muted-foreground">{session.description}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {formatDate(session.date)}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {session.groups.map((group) => (
              <Badge
                key={group.id}
                variant="outline"
                className="border-3 rounded-2xl px-2 py-1 text-xs font-medium"
              >
                {group.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
