"use client"

import { useQuery } from "@tanstack/react-query"
import { Suspense } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SessionsList from "@/components/attendance/session.list"
import { LoadingSpinner } from "@/components/global/login/loading"
import type { Session } from "@/lib/types"

const fetchSession = async (): Promise<Session[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}api/session/sessions?limit=10&page=1`)
  console.log(res)
  if (!res.ok) throw new Error("Failed to fetch session data")
  const json = await res.json()
  return json
}

export default function Page() {
  const { data: sessions, isLoading, isError } = useQuery({
    queryKey: ["AttendanceSessions"],
    queryFn: fetchSession,
  })

  
  if (isError) return <div>Failed to load sessions.</div>

  return (
    <div className="m-3 border-[1.5px] p-3 rounded-2xl">
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search" className="w-full pl-8 bg-white" />
          </div>
          <Button variant="outline" size="sm" className="ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            <span className="ml-2">Filter</span>
          </Button>
        </div>

        {isError && <div className="text-red-500">Failed to load sessions.</div>}

        {isLoading ? (
          <div className="flex justify-center items-center h-6 pt-10">
            <LoadingSpinner  fullPage={false} />
          </div>
        ) : (
          <Suspense fallback={<LoadingSpinner />}>
            <SessionsList sessions={sessions || []} />
          </Suspense>
        )}
      </div>
    </div>
  )
}

