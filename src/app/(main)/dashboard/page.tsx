import AttendanceOverview from '@/components/dashboard/attendance.overview'
import { MetricCards } from '@/components/dashboard/dashboardCards'
import EventCard from '@/components/dashboard/event.card'
import SessionCalendar from '@/components/dashboard/session.calendar'
import React from 'react'

export default function page() {
  return (
    <div className='flex justify-between w-[1000px] ml-2.5 mt-2.5'>
      <div>
        <EventCard />
        <MetricCards />
        <AttendanceOverview />
      </div>
      <div>
      <SessionCalendar />
      </div>
    </div>
  )
}
