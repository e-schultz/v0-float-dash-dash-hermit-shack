"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

// Mock data - in a real app, this would come from your notes
const tasks = [
  { id: 1, text: "Review chat logs from yesterday", completed: false, tags: ["daily"] },
  { id: 2, text: "Continue work on FloatQL implementation", completed: false, tags: ["project", "code"] },
  { id: 3, text: "Laundry in - check washers in 40 mins", completed: true, tags: ["chore"] },
  { id: 4, text: "Collect Bones - Chat Logs and Exports to round up", completed: false, tags: ["system"] },
  { id: 5, text: "Investigate how to best make use of the task plugin", completed: false, tags: ["system"] },
]

export function TaskSummary() {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("active")

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true
    if (filter === "active") return !task.completed
    if (filter === "completed") return task.completed
    return true
  })

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Tasks</CardTitle>
            <CardDescription>Track your progress</CardDescription>
          </div>
          <Button asChild size="sm">
            <Link href="/tasks/new">
              <PlusCircle className="h-4 w-4 mr-1" />
              New Task
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active" className="w-full" onValueChange={(v) => setFilter(v as any)}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-2">
            {renderTaskList(filteredTasks)}
          </TabsContent>

          <TabsContent value="active" className="space-y-2">
            {renderTaskList(filteredTasks)}
          </TabsContent>

          <TabsContent value="completed" className="space-y-2">
            {renderTaskList(filteredTasks)}
          </TabsContent>
        </Tabs>

        <div className="mt-4 text-right">
          <Button asChild variant="outline" size="sm">
            <Link href="/tasks">View All Tasks</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function renderTaskList(tasks: typeof tasks) {
  if (tasks.length === 0) {
    return <div className="text-center py-4 text-muted-foreground">No tasks found</div>
  }

  return tasks.map((task) => (
    <div key={task.id} className="flex items-start gap-2 p-2 rounded hover:bg-muted/50">
      <Checkbox checked={task.completed} className="mt-1" />
      <div className="flex-1">
        <span className={task.completed ? "line-through opacity-70" : ""}>{task.text}</span>
        {task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {task.tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  ))
}
