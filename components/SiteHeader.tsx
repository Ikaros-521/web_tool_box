import Link from "next/link"

export default function SiteHeader() {
  return (
    <div className="bg-gradient-to-r from-zinc-900 to-zinc-700 text-white">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">Web Tool Box</Link>
        <div className="text-xs opacity-80">前端小工具集合</div>
      </div>
    </div>
  )
}

