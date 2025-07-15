import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { FileText, Calendar } from "lucide-react"
import { format } from "date-fns"

// Mock data - in a real app, this would come from your notes
const recentNotes = [
  {
    id: 1,
    title: "Jane Interview - Gentle Re-entry",
    path: "Jane Interview - Gentle Re-entry",
    excerpt: "Preparing for the Jane interview with a focus on gentle re-entry...",
    created: new Date("2025-05-11T15:30:00"),
    tags: ["interview", "jane", "work"],
  },
  {
    id: 2,
    title: "FLOAT.log/2025-05-11",
    path: "FLOAT.log/2025-05-11",
    excerpt: "Daily log with chat-log linkages and evening worklog...",
    created: new Date("2025-05-11T08:43:00"),
    tags: ["daily", "log"],
  },
  {
    id: 3,
    title: "FloatQL Query Framework",
    path: "FloatQL Query Framework",
    excerpt: "Implementation details for the FloatQL query system...",
    created: new Date("2025-05-10T14:22:00"),
    tags: ["floatql", "development", "query"],
  },
  {
    id: 4,
    title: "Obsidian URI Test Summary",
    path: "2025-05-11 - obsidian uri test summary",
    excerpt: "Testing and debugging Obsidian URI functionality...",
    created: new Date("2025-05-11T12:15:00"),
    tags: ["obsidian", "uri", "test"],
  },
]

export function RecentNotes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Notes</CardTitle>
        <CardDescription>Your latest notes and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentNotes.map((note) => (
            <Link
              key={note.id}
              href={`/notes/${encodeURIComponent(note.path.toLowerCase().replace(/\s+/g, "-"))}`}
              className="block"
            >
              <div className="p-3 rounded-md hover:bg-muted/50 transition-colors">
                <div className="flex items-start gap-3">
                  {note.tags.includes("daily") ? (
                    <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  ) : (
                    <FileText className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 space-y-1">
                    <div className="font-medium">{note.title}</div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{note.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                      <span>{format(note.created, "MMM d, yyyy 'at' h:mm a")}</span>
                      <div className="flex gap-1">
                        {note.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                            #{tag}
                          </span>
                        ))}
                        {note.tags.length > 2 && (
                          <span className="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                            +{note.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
