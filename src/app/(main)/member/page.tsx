import LoginPage from '@/components/global/login/login'
import MemberTable from '@/components/member/member.table'
import AttendancePage from '@/components/member/profile/attendance.page'
import ProgressPage from '@/components/member/profile/progress.page'
import React from 'react'

function page() {
  return (
    <div className='p-5 ml-1'>
      <MemberTable userRole='admin' />
    </div>
  )
}

export default page
