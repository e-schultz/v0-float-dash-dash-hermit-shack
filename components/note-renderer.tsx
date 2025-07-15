"use client"

import React from "react"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeReact from "rehype-react"
import remarkGfm from "remark-gfm"
import { createElement, Fragment } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Custom components for rendering
const components = {
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    // Handle wiki-style links [[Link]]
    if (href?.startsWith("[[") && href.endsWith("]]")) {
      const linkText = href.slice(2, -2)
      return (
        <Link
          href={`/notes/${encodeURIComponent(linkText.toLowerCase().replace(/\s+/g, "-"))}`}
          className="text-blue-500 hover:underline"
        >
          {children || linkText}
        </Link>
      )
    }

    return (
      <a href={href} className="text-blue-500 hover:underline" {...props}>
        {children}
      </a>
    )
  },

  // Custom task list items
  li: ({ children, className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => {
    // Check if this is a task item
    if (className?.includes("task-list-item")) {
      return (
        <li className="flex items-start gap-2 my-1" {...props}>
          <Checkbox className="mt-1" />
          <span>{children}</span>
        </li>
      )
    }

    return (
      <li className={className} {...props}>
        {children}
      </li>
    )
  },
}

interface NoteRendererProps {
  content: string
  className?: string
}

export function NoteRenderer({ content, className }: NoteRendererProps) {
  // Process custom syntax that isn't handled by remark
  const processedContent = React.useMemo(() => {
    return (
      content
        // Convert [[wiki links]] to proper links
        .replace(/\[\[(.*?)\]\]/g, "[$1]([[${1}]])")
        // Process metadata tags like [ctx::value]
        .replace(
          /\[([\w]+)::(.*?)\]/g,
          '<span class="metadata"><span class="metadata-key">$1</span>: <span class="metadata-value">$2</span></span>',
        )
    )
  }, [content])

  // Use unified/remark to parse and render markdown
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm) // Adds support for tables, strikethrough, etc.
    .use(remarkRehype)
    .use(rehypeReact, { createElement, Fragment, components })

  const result = processor.processSync(processedContent).result

  return (
    <div
      className={cn(
        "prose prose-sm max-w-none dark:prose-invert",
        "prose-headings:font-bold prose-headings:tracking-tight",
        "prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline",
        "prose-code:bg-muted prose-code:rounded prose-code:px-1 prose-code:py-0.5",
        className,
      )}
    >
      {result}
    </div>
  )
}
