"use client"

import { useState, useCallback, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NoteRenderer } from "@/components/note-renderer"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

interface NoteEditorProps {
  initialContent: string
  readOnly?: boolean
  onSave?: (content: string) => void
}

export function NoteEditor({ initialContent, readOnly = false, onSave }: NoteEditorProps) {
  const [content, setContent] = useState(initialContent)
  const [activeTab, setActiveTab] = useState<string>(readOnly ? "preview" : "edit")

  // Update content if initialContent changes (e.g., when switching notes)
  useEffect(() => {
    setContent(initialContent)
  }, [initialContent])

  const handleSave = useCallback(() => {
    onSave?.(content)
  }, [content, onSave])

  return (
    <Card className="border rounded-md">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <TabsList>
            {!readOnly && <TabsTrigger value="edit">Edit</TabsTrigger>}
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          {!readOnly && (
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          )}
        </div>

        {!readOnly && (
          <TabsContent value="edit" className="p-0">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="font-mono text-sm min-h-[300px] rounded-none border-0 resize-none focus-visible:ring-0"
              placeholder="Start writing..."
            />
          </TabsContent>
        )}

        <TabsContent value="preview" className="p-4">
          <NoteRenderer content={content} />
        </TabsContent>
      </Tabs>
    </Card>
  )
}
