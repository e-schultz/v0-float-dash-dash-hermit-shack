"use client"

import { NoteRenderer } from "@/components/note-renderer"

interface NoteViewerProps {
  content: string
  className?: string
}

export function NoteViewer({ content, className }: NoteViewerProps) {
  return <NoteRenderer content={content} className={className} />
}
