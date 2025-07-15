"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { SearchIcon, FileText, Calendar, Tag, Hash } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

// Mock data - in a real app, this would come from your search backend
const searchResults = {
  notes: [
    {
      id: 1,
      title: "Jane Interview - Gentle Re-entry",
      path: "Jane Interview - Gentle Re-entry",
      excerpt: "This is a preparation note for the upcoming Jane interview, focusing on a gentle re-entry approach...",
      created: new Date("2025-05-11T15:30:00"),
      tags: ["interview", "jane", "work"],
    },
    {
      id: 2,
      title: "FloatQL Query Framework",
      path: "FloatQL Query Framework",
      excerpt:
        "FloatQL is a query language designed to provide a unified interface for querying different data sources in the FLOAT system...",
      created: new Date("2025-05-10T14:22:00"),
      tags: ["floatql", "development", "query"],
    },
  ],
  tasks: [
    {
      id: 1,
      text: "Review previous interview notes",
      completed: false,
      note: "Jane Interview - Gentle Re-entry",
      created: new Date("2025-05-11T15:30:00"),
    },
    {
      id: 2,
      text: "Implement Chroma adapter",
      completed: false,
      note: "FloatQL Query Framework",
      created: new Date("2025-05-10T14:22:00"),
    },
  ],
  tags: [
    { name: "interview", count: 3 },
    { name: "jane", count: 2 },
    { name: "floatql", count: 5 },
    { name: "development", count: 8 },
  ],
}

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would perform the search here
    console.log("Searching for:", query)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Search</h1>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search your notes, tasks, and tags..."
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </div>
      </form>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {/* Notes Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-medium flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Notes
              </h2>
              {searchResults.notes.length > 2 && (
                <Button variant="link" size="sm" onClick={() => setActiveTab("notes")}>
                  View All
                </Button>
              )}
            </div>
            <div className="space-y-3">
              {searchResults.notes.slice(0, 2).map((note) => (
                <NoteSearchResult key={note.id} note={note} />
              ))}
            </div>
          </div>

          {/* Tasks Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-medium flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Tasks
              </h2>
              {searchResults.tasks.length > 2 && (
                <Button variant="link" size="sm" onClick={() => setActiveTab("tasks")}>
                  View All
                </Button>
              )}
            </div>
            <div className="space-y-3">
              {searchResults.tasks.slice(0, 2).map((task) => (
                <TaskSearchResult key={task.id} task={task} />
              ))}
            </div>
          </div>

          {/* Tags Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-medium flex items-center">
                <Tag className="h-5 w-5 mr-2" />
                Tags
              </h2>
              {searchResults.tags.length > 6 && (
                <Button variant="link" size="sm" onClick={() => setActiveTab("tags")}>
                  View All
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {searchResults.tags.slice(0, 6).map((tag) => (
                <TagSearchResult key={tag.name} tag={tag} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notes">
          <div className="space-y-3">
            {searchResults.notes.map((note) => (
              <NoteSearchResult key={note.id} note={note} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tasks">
          <div className="space-y-3">
            {searchResults.tasks.map((task) => (
              <TaskSearchResult key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tags">
          <div className="flex flex-wrap gap-2">
            {searchResults.tags.map((tag) => (
              <TagSearchResult key={tag.name} tag={tag} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function NoteSearchResult({ note }: { note: any }) {
  return (
    <Card>
      <CardContent className="p-4">
        <Link href={`/notes/${encodeURIComponent(note.path.toLowerCase().replace(/\s+/g, "-"))}`} className="block">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            <div className="flex-1 space-y-1">
              <div className="font-medium">{note.title}</div>
              <p className="text-sm text-muted-foreground line-clamp-2">{note.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                <span>{format(note.created, "MMM d, yyyy")}</span>
                <div className="flex gap-1">
                  {note.tags.map((tag) => (
                    <span key={tag} className="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}

function TaskSearchResult({ task }: { task: any }) {
  return (
    <Card>
      <CardContent className="p-4">
        <Link href={`/notes/${encodeURIComponent(task.note.toLowerCase().replace(/\s+/g, "-"))}`} className="block">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="font-medium">{task.text}</div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                <span>From: {task.note}</span>
                <span>{format(task.created, "MMM d, yyyy")}</span>
              </div>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}

function TagSearchResult({ tag }: { tag: any }) {
  return (
    <Link href={`/tags/${tag.name}`}>
      <div className="flex items-center gap-1 bg-gray-200 dark:bg-gray-700 px-3 py-1.5 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600">
        <Hash className="h-3.5 w-3.5" />
        <span>{tag.name}</span>
        <span className="text-xs text-muted-foreground ml-1">({tag.count})</span>
      </div>
    </Link>
  )
}
