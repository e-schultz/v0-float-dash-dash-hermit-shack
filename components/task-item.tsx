import type React from "react"
import { Checkbox } from "@/components/ui/checkbox"

interface TaskItemProps {
  children: React.ReactNode
  completed?: boolean
  tags?: string[]
}

export function TaskItem({ children, completed = false, tags = [] }: TaskItemProps) {
  return (
    <div className="flex items-start gap-2 my-2 p-2 rounded bg-gray-50 dark:bg-gray-800">
      <Checkbox checked={completed} className="mt-1" />
      <div className="flex-1">
        <span className={completed ? "line-through opacity-70" : ""}>{children}</span>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
