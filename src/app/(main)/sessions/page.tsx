import { AddNewSessionWithTimeSlots } from '@/components/sessionsAndEvents/addNewSessionsWithTimeSlots'
import { AddNewSessionModal } from '@/components/sessionsAndEvents/addNewSessions'
import { AddNewSessionWithCalendar } from '@/components/sessionsAndEvents/addNewSessionsWithCalendar'
import { SessionsListView } from '@/components/sessionsAndEvents/sessionsListView'
import { SessionsTableView } from '@/components/sessionsAndEvents/sessionsTableView'
import React from 'react'

function page() {
  return (
    <div>
        {/* <SessionsListView /> */}
        {/* <SessionsTableView /> */}
        {/* <AddNewSessionModal /> */}
        {/* <AddNewSessionWithCalendar />  */}
        <AddNewSessionWithTimeSlots />

    </div>
  )
}

export default page