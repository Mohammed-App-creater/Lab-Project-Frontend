'use client'
import { GroupMembersTableUI } from '@/components/divisions/GroupMembersTable'
import { use } from 'react'

function Page({ params }: { params: Promise<{ group: string, division: string }> }) {
  const { group, division } = use(params);
  
  return (
    <div>
      <GroupMembersTableUI divisionId={division} groupId={group} />
    </div>
  )
}

export default Page
