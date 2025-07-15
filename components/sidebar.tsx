"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar, FileText, Home, Search, Settings, Tag, CheckSquare, Network, FolderTree } from "lucide-react"

const sidebarLinks = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Daily Notes", href: "/daily", icon: Calendar },
  { name: "All Notes", href: "/notes", icon: FileText },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Tags", href: "/tags", icon: Tag },
  { name: "Graph View", href: "/graph", icon: Network },
  { name: "File Explorer", href: "/files", icon: FolderTree },
]

export function Sidebar() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="w-64 border-r bg-sidebar-background text-sidebar-foreground flex flex-col h-full">
      <div className="p-4 border-b">
        <h1 className="font-bold text-xl">FLOAT.SHACK</h1>
      </div>

      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="flex-1 px-4">
        <nav className="space-y-1 py-2">
          {sidebarLinks.map((link) => {
            const Icon = link.icon
            return (
              <Button
                key={link.href}
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  pathname === link.href && "bg-sidebar-accent text-sidebar-accent-foreground",
                )}
                asChild
              >
                <Link href={link.href}>
                  <Icon className="mr-2 h-4 w-4" />
                  {link.name}
                </Link>
              </Button>
            )
          })}
        </nav>

        <div className="py-4">
          <h3 className="text-sm font-medium mb-2">Recent Projects</h3>
          <div className="space-y-1">
            {["FLOAT.sys", "Jane Interview", "FloatQL"].map((project) => (
              <Button key={project} variant="ghost" className="w-full justify-start text-sm h-8" asChild>
                <Link href={`/projects/${project.toLowerCase().replace(/\s+/g, "-")}`}>{project}</Link>
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 border-t mt-auto">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/settings">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </Button>
      </div>
    </div>
  )
}
