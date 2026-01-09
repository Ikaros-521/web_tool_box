import ToolLoader from "../../../components/ToolLoader"
import Link from "next/link"

export default function Page() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <nav className="mb-4">
        <Link href="/" className="text-sm text-zinc-600">← 返回首页</Link>
      </nav>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">JSON 格式化</h1>
        <p className="text-sm text-zinc-600">格式化/校验 JSON 文本</p>
      </header>
      <ToolLoader id="json-formatter" />
    </div>
  )
}

