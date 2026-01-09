import ToolLoader from "../../../components/ToolLoader"
import Link from "next/link"

export default function Page() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <nav className="mb-4">
        <Link href="/" className="text-sm text-zinc-600">← 返回首页</Link>
      </nav>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">时间戳转换</h1>
        <p className="text-sm text-zinc-600">秒/毫秒、时间与时区转换，支持加减日期</p>
      </header>
      <ToolLoader id="timestamp" />
    </div>
  )
}

