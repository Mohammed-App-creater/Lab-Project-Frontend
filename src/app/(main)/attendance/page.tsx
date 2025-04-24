import { Suspense } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { fetchSessions } from "@/lib/data"
import SessionsList from "@/components/attendance/session.list"

export default async function Page() {
  const sessions = await fetchSessions()
  return (
    <div className="m-3 shadow-xl p-3 rounded-2xl">
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
      <Suspense fallback={<div>Loading sessions...</div>}>
        <SessionsList sessions={sessions} />
      </Suspense>
    </div>
    </div>
  )
}
