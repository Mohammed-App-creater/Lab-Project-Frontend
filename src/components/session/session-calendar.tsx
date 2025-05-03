"use client";

import { useState } from "react";
import { CalendarIcon, MoreVertical } from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
} from "date-fns";

import { Button } from "@/components/ui/button";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import  PageLoader  from "../global/login/pageLoader"

export interface Session {
  id: string;
  title: string;
  startTime?: string;
  divisionName?: string;
  tags?: string[];
}

export interface SessionData {
  date: string; // Format: "YYYY-MM-DD"
  sessions: Session[];
}

interface SessionCalendarProps {
  data: SessionData[];
  className?: string;
  isLoading?: boolean;
  error?: string | null;
}

export function SessionCalendar({
  data,
  className,
  isLoading = false,
  error = null,
}: SessionCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Navigation functions
  const goToPreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  // Generate calendar days
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startingDayOffset = getDay(monthStart);

  // Group sessions by date
  const sessionsByDate = data.reduce((acc, item) => {
    acc[item.date] = item.sessions;
    return acc;
  }, {} as Record<string, Session[]>);

  // Get visible sessions for the current month view
  const visibleSessions = data
    .filter((item) => {
      const date = new Date(item.date);
      return date >= new Date(currentDate.toDateString()); // Compare only by date (ignore time)
    })
    .sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

  if (isLoading) {
    return (
      <Card className={cn("w-full max-w-md mx-auto", className)}>
        <CardHeader className="flex flex-row items-center space-y-0 pb-4">
          <CardTitle className="text-xl">Session</CardTitle>
          <div className="ml-auto rounded-full bg-primary/10 p-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
          </div>
        </CardHeader>
        <CardContent className="pb-6 pt-0 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center h-64">
            <PageLoader fullPage={false} />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={cn("w-full max-w-md mx-auto", className)}>
        <CardHeader className="flex flex-row items-center space-y-0 pb-4">
          <CardTitle className="text-xl">Session</CardTitle>
          <div className="ml-auto rounded-full bg-primary/10 p-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
          </div>
        </CardHeader>
        <CardContent className="pb-6 pt-0">
          <div className="flex items-center justify-center h-64">
            <div className="text-red-500">Error: {error}</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "w-full max-w-md relative mx-auto max-h-13/12 overflow-auto hide-scrollbar  ",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center space-y-0 pb-4">
        <CardTitle className="text-xl">Session</CardTitle>
        <div className="ml-auto rounded-full bg-primary/10 p-2">
          <CalendarIcon className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="pb-6 pt-0 ">
        <div className="space-y-4">
          {/* Calendar header with navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 bg-[#003087] text-primary-foreground"
              onClick={goToPreviousMonth}
            >
              <FaArrowLeftLong className="h-4 w-4" />
              <span className="sr-only">Previous month</span>
            </Button>
            <div className="text-xl font-medium">
              {format(currentDate, "MMMM, yyyy")}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 bg-[#003087] text-primary-foreground"
              onClick={goToNextMonth}
            >
              <FaArrowRightLong className="h-4 w-4" />
              <span className="sr-only">Next month</span>
            </Button>
          </div>

          {/* Calendar grid */}
          <div>
            {/* Day headers */}
            <div className="grid grid-cols-7 text-center mb-2">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
                <div key={index} className="text-sm font-medium py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {/* Empty cells for days before the start of the month */}
              {Array.from({ length: startingDayOffset }).map((_, index) => (
                <div key={`empty-${index}`} className="h-10 p-2" />
              ))}

              {/* Actual days of the month */}
              {daysInMonth.map((day) => {
                const dateStr = format(day, "yyyy-MM-dd");
                const hasSession = sessionsByDate[dateStr]?.length > 0;

                return (
                  <div
                    key={day.toString()}
                    className={cn(
                      "h-10 w-10 mx-auto flex items-center justify-center rounded-full",
                      hasSession
                        ? "bg-[#003087] text-primary-foreground"
                        : "text-foreground"
                    )}
                  >
                    {format(day, "d")}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Session details */}
          <div className="mt-8 space-y-6">
            {visibleSessions.length > 0 ? (
              visibleSessions.map((dayData) => (
                <div key={dayData.date} className="space-y-4 border-none">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">
                      {format(new Date(dayData.date), "EEEE, dd MMMM yyyy")}
                    </h3>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {dayData.sessions.map((session) => {
                      const category =
                        session.divisionName || session.tags?.[0] || "General";
                      const time = session.startTime
                        ? format(new Date(session.startTime), "h:mm a")
                        : "All day";

                      return (
                        <div key={session.id} className="flex">
                          <div className="w-16 font-medium">{time}</div>
                          <div className="w-1  bg-gradient-to-b from-[#003087] to-[#002f8700] mx-3 rounded-t-2xl"></div>
                          <div className="flex-1">
                            <div className="text-muted-foreground">
                              {category}
                            </div>
                            <div className="font-medium">{session.title}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {dayData.date !==
                    visibleSessions[visibleSessions.length - 1].date && (
                    <div className="mb-2"></div>
                  )}
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-32">
                <div className="text-muted-foreground">
                  No sessions for this month
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
