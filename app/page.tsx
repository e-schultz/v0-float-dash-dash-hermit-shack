import { DailyNote } from "@/components/daily-note"
import { RecentNotes } from "@/components/recent-notes"
import { TaskSummary } from "@/components/task-summary"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">FLOAT.SHACK Dashboard</h1>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/notes/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Note
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <DailyNote />
          <TaskSummary />
        </div>
        <div>
          <RecentNotes />
        </div>
      </div>
    </div>
  )
}
