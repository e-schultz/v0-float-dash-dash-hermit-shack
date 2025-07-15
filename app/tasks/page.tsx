"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { PlusCircle, Search, Filter, ArrowUpDown, TagIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

// Mock data - in a real app, this would come from your notes
const tasks = [
  { id: 1, text: "Review chat logs from yesterday", completed: false, tags: ["daily"], note: "FLOAT.log/2025-05-11" },
  {
    id: 2,
    text: "Continue work on FloatQL implementation",
    completed: false,
    tags: ["project", "code"],
    note: "FLOAT.log/2025-05-11",
  },
  {
    id: 3,
    text: "Laundry in - check washers in 40 mins",
    completed: true,
    tags: ["chore"],
    note: "FLOAT.log/2025-05-11",
  },
  {
    id: 4,
    text: "Collect Bones - Chat Logs and Exports to round up",
    completed: false,
    tags: ["system"],
    note: "FLOAT.log/2025-05-11",
  },
  {
    id: 5,
    text: "Investigate how to best make use of the task plugin",
    completed: false,
    tags: ["system"],
    note: "FLOAT.log/2025-05-11",
  },
  {
    id: 6,
    text: "Review previous interview notes",
    completed: false,
    tags: ["interview", "jane"],
    note: "Jane Interview - Gentle Re-entry",
  },
  {
    id: 7,
    text: "Prepare questions about architecture",
    completed: false,
    tags: ["interview", "jane"],
    note: "Jane Interview - Gentle Re-entry",
  },
  {
    id: 8,
    text: "Research Jane's recent projects",
    completed: false,
    tags: ["interview", "jane", "research"],
    note: "Jane Interview - Gentle Re-entry",
  },
  {
    id: 9,
    text: "Implement Chroma adapter",
    completed: false,
    tags: ["floatql", "development"],
    note: "FloatQL Query Framework",
  },
  {
    id: 10,
    text: "Test vector search capabilities",
    completed: false,
    tags: ["floatql", "development", "testing"],
    note: "FloatQL Query Framework",
  },
  {
    id: 11,
    text: "Document query patterns",
    completed: false,
    tags: ["floatql", "documentation"],
    note: "FloatQL Query Framework",
  },
]

export default function TasksPage() {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Get all unique tags
  const allTags = Array.from(new Set(tasks.flatMap((task) => task.tags)))

  // Filter tasks based on current filters
  const filteredTasks = tasks.filter((task) => {
    // Filter by completion status
    if (filter === "active" && task.completed) return false
    if (filter === "completed" && !task.completed) return false

    // Filter by search query
    if (searchQuery && !task.text.toLowerCase().includes(searchQuery.toLowerCase())) return false

    // Filter by selected tags
    if (selectedTags.length > 0 && !selectedTags.some((tag) => task.tags.includes(tag))) return false

    return true
  })

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <Button asChild>
          <Link href="/tasks/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Task
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Task Manager</CardTitle>
          <CardDescription>Manage and track your tasks across all notes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tasks..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter by Tag
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {allTags.map((tag) => (
                  <DropdownMenuItem
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className="flex items-center justify-between"
                  >
                    <span>#{tag}</span>
                    {selectedTags.includes(tag) && <span className="h-2 w-2 rounded-full bg-primary"></span>}
                  </DropdownMenuItem>
                ))}
                {selectedTags.length > 0 && (
                  <DropdownMenuItem
                    onClick={() => setSelectedTags([])}
                    className="border-t mt-2 pt-2 text-muted-foreground"
                  >
                    Clear filters
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </div>

          {selectedTags.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <TagIcon className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-1">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                  >
                    #{tag}
                    <button onClick={() => toggleTag(tag)} className="hover:text-primary/80">
                      ×
                    </button>
                  </span>
                ))}
                <button
                  onClick={() => setSelectedTags([])}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}

          <Tabs defaultValue="all" value={filter} onValueChange={(v) => setFilter(v as any)}>
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
        </CardContent>
      </Card>
    </div>
  )
}

function renderTaskList(tasks: typeof tasks) {
  if (tasks.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No tasks found matching your filters</div>
  }

  return tasks.map((task) => (
    <div key={task.id} className="flex items-start gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors">
      <Checkbox checked={task.completed} className="mt-1" />
      <div className="flex-1">
        <div className={task.completed ? "line-through opacity-70" : ""}>{task.text}</div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-wrap gap-1">
            {task.tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                #{tag}
              </span>
            ))}
          </div>
          <Link
            href={`/notes/${encodeURIComponent(task.note.toLowerCase().replace(/\s+/g, "-"))}`}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            {task.note}
          </Link>
        </div>
      </div>
    </div>
  ))
}
