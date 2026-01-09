import type { ToolDescriptor } from "../../../lib/tools"
import { tools } from "../../../lib/tools"
import ToolLoader from "../../../components/ToolLoader"
import { notFound } from "next/navigation"
import Link from "next/link"

export default function ToolPage({ params }: { params: { id: string } }) {
  const normalized = decodeURIComponent(params.id).trim().toLowerCase()
  const tool: ToolDescriptor | undefined = tools.find(
    (t) => t.id.toLowerCase() === normalized
  )
  if (!tool) return notFound()
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <nav className="mb-4">
        <Link href="/" className="text-sm text-zinc-600">← 返回首页</Link>
      </nav>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">{tool.name}</h1>
        <p className="text-sm text-zinc-600">{tool.description}</p>
      </header>
      <ToolLoader id={tool.id} />
    </div>
  )
}

export function generateStaticParams() {
  return tools.map((t) => ({ id: t.id }))
}

