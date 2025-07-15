import { NoteViewer } from "@/components/note-viewer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Edit, Calendar, Tag } from "lucide-react"
import Link from "next/link"

// In a real app, you would fetch this data from your notes storage
const getNoteBySlug = (slug: string) => {
  // Mock data for demonstration
  const notes = {
    "jane-interview-gentle-re-entry": {
      title: "Jane Interview - Gentle Re-entry",
      content: `---
created: 2025-05-11T15:30:00
UID: "note::20250511153000"
tags: [interview, jane, work]
type: note
---

# Jane Interview - Gentle Re-entry

## Context
- [ctx:: 2025-05-11] [mode::preparation]

This is a preparation note for the upcoming Jane interview, focusing on a gentle re-entry approach.

## Key Points
- [ ] #task Review previous interview notes
- [ ] #task Prepare questions about architecture
- [ ] #task Research Jane's recent projects

## Notes from Previous Conversations
From our last call, Jane mentioned her interest in [[FloatQL]] and how it might integrate with her current systems.

> "I'm particularly interested in how the query framework handles metadata across different storage backends."

## Action Items
- Schedule follow-up call
- Share architecture diagrams
- Connect Jane with the development team`,
      created: "2025-05-11T15:30:00",
      tags: ["interview", "jane", "work"],
    },
    "float-log-2025-05-11": {
      title: "FLOAT.log/2025-05-11",
      content: `---
created: 2025-05-09T19:54:41
UID: "log::20250509195441"
tags: [daily, y2025/q2/w19]
type: log
---

<< [[FLOAT.log/2025-05-10|05-10]]  | [[FLOAT.log/2025-05-12|05-12]] >>

## chat-log linkages

- [2025-05-11 - claude system boot - float aligned mcp enabled](https://claude.ai/chat/a9c66764-e733-4d52-88e9-a0c675589706)

## bones with meat on them
- ctx:: chat logs that might be worth giving some more attention -- was trying to find one log, while stepping into others that made me go - 'hey, wait a minute - theres treausre in there'
	- laundry half in the dryer, waiting for other dryers to become free - had hotdogs while waiting
- claude: Leveraging Chroma Tools for Remembering Forward
	- public share:: https://claude.ai/share/c4d4f59c-5254-4366-9a7b-25fd21b98a13
	- src:: https://claude.ai/chat/4a21146c-1f04-4290-9100-d5e4be8ff922
	- path:: processing-vault/exported/claude_exports_r/added 2025-05-11
		- filename:: Claude-Leveraging Chroma Tools for Remembering Forward.json`,
      created: "2025-05-11T08:43:00",
      tags: ["daily", "log"],
    },
    "floatql-query-framework": {
      title: "FloatQL Query Framework",
      content: `---
created: 2025-05-10T14:22:00
UID: "note::20250510142200"
tags: [floatql, development, query]
type: note
---

# FloatQL Query Framework

## Overview
FloatQL is a query language designed to provide a unified interface for querying different data sources in the FLOAT system.

## Key Components
- Query Parser
- Execution Engine
- Adapter System for different backends

## Implementation Notes
\`\`\`javascript
// Example FloatQL query
float.query({
  collection: "notes",
  filter: {
    tags: ["floatql", "development"],
    created: { $gt: "2025-01-01" }
  },
  sort: { created: -1 },
  limit: 10
})
\`\`\`

## Integration with Chroma
- [ ] #task Implement Chroma adapter
- [ ] #task Test vector search capabilities
- [ ] #task Document query patterns`,
      created: "2025-05-10T14:22:00",
      tags: ["floatql", "development", "query"],
    },
  }

  return notes[slug] || null
}

export default function NotePage({ params }: { params: { slug: string } }) {
  const note = getNoteBySlug(params.slug)

  if (!note) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/notes">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Notes
            </Link>
          </Button>
        </div>

        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Note Not Found</h1>
          <p className="text-muted-foreground mb-6">The note you're looking for doesn't exist or has been moved.</p>
          <Button asChild>
            <Link href="/notes">Browse All Notes</Link>
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/notes">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Notes
          </Link>
        </Button>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            {new Date(note.created).toLocaleDateString()}
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/notes/${params.slug}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <h1 className="text-3xl font-bold">{note.title}</h1>
        <div className="flex items-center gap-2 mt-2">
          <Tag className="h-4 w-4 text-muted-foreground" />
          <div className="flex flex-wrap gap-1">
            {note.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg shadow-sm p-6">
        <NoteViewer content={note.content} />
      </div>
    </div>
  )
}
