'use client'
import { GroupMembersTableUI } from '@/components/divisions/GroupMembersTable'
import { use } from 'react'

function Page({ params }: { params: Promise<{ group: string }> }) {
  const { group } = use(params);
  
  return (
    <div>
      <GroupMembersTableUI groupId={group} />
    </div>
  )
}

export default Page
