"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NoteEditor } from "@/components/note-editor"
import Link from "next/link"

export function DailyNote() {
  const [date, setDate] = useState<Date>(new Date())
  const formattedDate = format(date, "yyyy-MM-dd")
  const displayDate = format(date, "MMMM d, yyyy")

  // In a real app, you would fetch the daily note content for the selected date
  const noteContent =
    date.toDateString() === new Date().toDateString()
      ? `---
created: ${format(date, "yyyy-MM-dd'T'HH:mm:ss")}
UID: "log::${format(date, "yyyyMMddHHmmss")}"
tags: [daily, y${format(date, "yyyy")}/q${Math.ceil((date.getMonth() + 1) / 3)}/w${Math.ceil(date.getDate() / 7)}]
type: log
---

## Good Morning Evan, how are you
- [ctx:: ${format(date, "yyyy-MM-dd - h:mma")}] [mode::brain booting]

Today's focus:
- [ ] #task Review chat logs from yesterday
- [ ] #task Continue work on FloatQL implementation
`
      : ""

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Daily Note</CardTitle>
          <CardDescription>Your journal for the day</CardDescription>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-8 w-8 p-0">
              <CalendarIcon className="h-4 w-4" />
              <span className="sr-only">Open calendar</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="text-lg font-medium">{displayDate}</h3>
        </div>
        {noteContent ? (
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <NoteEditor initialContent={noteContent} readOnly={false} />
            <div className="mt-4">
              <Button asChild>
                <Link href={`/daily/${formattedDate}`}>Open Full Note</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground mb-4">No daily note for this date yet</p>
            <Button>Create Daily Note</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
