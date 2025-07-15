"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ZoomIn, ZoomOut, Filter } from "lucide-react"
import ForceGraph2D from "react-force-graph-2d"
import { useTheme } from "next-themes"

// Mock data - in a real app, this would come from your notes
const graphData = {
  nodes: [
    { id: "FLOAT.log/2025-05-11", group: "daily", label: "Daily Log (05-11)" },
    { id: "FLOAT.log/2025-05-10", group: "daily", label: "Daily Log (05-10)" },
    { id: "FLOAT.log/2025-05-12", group: "daily", label: "Daily Log (05-12)" },
    { id: "Jane Interview - Gentle Re-entry", group: "note", label: "Jane Interview" },
    { id: "FloatQL Query Framework", group: "note", label: "FloatQL" },
    { id: "Obsidian URI Test Summary", group: "note", label: "Obsidian URI" },
    { id: "LLMs-Chroma_Integration_Guide", group: "system", label: "Chroma Guide" },
    { id: "FLOAT.sys/INDEX", group: "system", label: "FLOAT.sys INDEX" },
  ],
  links: [
    { source: "FLOAT.log/2025-05-11", target: "FLOAT.log/2025-05-10" },
    { source: "FLOAT.log/2025-05-11", target: "FLOAT.log/2025-05-12" },
    { source: "FLOAT.log/2025-05-11", target: "Jane Interview - Gentle Re-entry" },
    { source: "Jane Interview - Gentle Re-entry", target: "FloatQL Query Framework" },
    { source: "FLOAT.log/2025-05-11", target: "Obsidian URI Test Summary" },
    { source: "FloatQL Query Framework", target: "LLMs-Chroma_Integration_Guide" },
    { source: "LLMs-Chroma_Integration_Guide", target: "FLOAT.sys/INDEX" },
  ],
}

export default function GraphPage() {
  const graphRef = useRef<any>()
  const [zoom, setZoom] = useState(1)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const handleZoomIn = () => {
    if (graphRef.current) {
      const newZoom = zoom * 1.2
      setZoom(newZoom)
      graphRef.current.zoom(newZoom)
    }
  }

  const handleZoomOut = () => {
    if (graphRef.current) {
      const newZoom = zoom * 0.8
      setZoom(newZoom)
      graphRef.current.zoom(newZoom)
    }
  }

  const handleZoomChange = (value: number[]) => {
    if (graphRef.current) {
      setZoom(value[0])
      graphRef.current.zoom(value[0])
    }
  }

  const getNodeColor = (node: any) => {
    if (node.group === "daily") return "#3b82f6" // blue
    if (node.group === "system") return "#10b981" // green
    if (node.group === "note") return "#8b5cf6" // purple
    return "#6b7280" // gray
  }

  useEffect(() => {
    // Adjust graph on resize
    const handleResize = () => {
      if (graphRef.current) {
        graphRef.current.centerAt()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="container mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Knowledge Graph</CardTitle>
          <CardDescription>Visualize connections between your notes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Slider value={[zoom]} min={0.1} max={2} step={0.1} onValueChange={handleZoomChange} className="w-32" />
              <Button variant="outline" size="icon" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="h-[600px] border rounded-md bg-background">
            <ForceGraph2D
              ref={graphRef}
              graphData={graphData}
              nodeLabel="label"
              nodeColor={getNodeColor}
              linkColor={() => (isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)")}
              nodeCanvasObject={(node: any, ctx, globalScale) => {
                const label = node.label
                const fontSize = 12 / globalScale
                ctx.font = `${fontSize}px Sans-Serif`
                const textWidth = ctx.measureText(label).width
                const bgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.8)

                ctx.fillStyle = getNodeColor(node)
                ctx.beginPath()
                ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI)
                ctx.fill()

                if (globalScale >= 0.8) {
                  ctx.fillStyle = isDark ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)"
                  ctx.fillRect(node.x - bgDimensions[0] / 2, node.y + 8, bgDimensions[0], bgDimensions[1])

                  ctx.textAlign = "center"
                  ctx.textBaseline = "middle"
                  ctx.fillStyle = isDark ? "white" : "black"
                  ctx.fillText(label, node.x, node.y + 8 + fontSize / 2)
                }
              }}
              cooldownTicks={100}
              onEngineStop={() => graphRef.current?.zoomToFit(400)}
            />
          </div>

          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span className="text-sm">Daily Notes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-500"></span>
              <span className="text-sm">Regular Notes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span className="text-sm">System Notes</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
