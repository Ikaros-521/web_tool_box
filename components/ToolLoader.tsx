"use client"
import { useEffect, useMemo, useState } from "react"
import type { ToolDescriptor } from "../lib/tools"
import { tools } from "../lib/tools"

export default function ToolLoader({ id }: { id: string }) {
  const tool: ToolDescriptor | undefined = useMemo(() => {
    const normalized = decodeURIComponent(id).trim().toLowerCase()
    return tools.find((t) => t.id.toLowerCase() === normalized)
  }, [id])
  const [Comp, setComp] = useState<React.ComponentType<any> | null>(null)

  useEffect(() => {
    let mounted = true
    if (tool) {
      tool.import().then((mod) => {
        if (mounted) setComp(() => mod.default)
      })
    }
    return () => {
      mounted = false
    }
  }, [tool])

  if (!tool) return <div className="text-red-600">未找到工具</div>
  if (!Comp) return <div className="text-zinc-600">加载中…</div>
  return <Comp />
}

