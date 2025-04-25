import AttendanceOverview from '@/components/dashboard/attendance.overview'
import { MetricCards } from '@/components/dashboard/dashboardCards'
import EventCard from '@/components/dashboard/event.card'
import SessionCalendar from '@/components/dashboard/session.calendar'
import React from 'react'

export default function page() {
  return (
    <div className='flex w-full justify-end '>
      <div className=' w-2/3 pr-4'>
        <EventCard />
        <MetricCards />
        <AttendanceOverview />
      </div>
      <div className='w-1/3 h-full flex flex-col gap-4'>
      <SessionCalendar />
      </div>
    </div>
  )
}
