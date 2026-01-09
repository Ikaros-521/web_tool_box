"use client"
import Link from "next/link"
import { useMemo, useState } from "react"
import { tools } from "../lib/tools"

export default function Home() {
  const [q, setQ] = useState("")
  const [cat, setCat] = useState<string>("全部")
  const categories = useMemo(() => {
    const set = new Set<string>(["全部"]) // 默认“全部”
    tools.forEach((t) => set.add(t.category))
    return Array.from(set)
  }, [])
  const results = useMemo(() => {
    const query = q.trim().toLowerCase()
    let list = tools
    if (cat !== "全部") list = list.filter((t) => t.category === cat)
    if (!query) return list
    return list.filter((t) =>
      [t.name, t.description, t.category, ...t.tags].some((s) => s.toLowerCase().includes(query))
    )
  }, [q, cat])

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Web Tool Box</h1>
        <Link href="/" className="text-sm text-zinc-600">首页</Link>
      </header>

      <div className="mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜索工具（例如：json、csv、格式化）"
          className="w-full rounded border border-zinc-300 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-zinc-400"
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full border px-3 py-1 text-sm ${
              cat === c ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-700 border-zinc-300"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {q.trim() === "" && cat === "全部" ? (
        <div className="space-y-8">
          {Array.from(new Set(tools.map((t) => t.category))).map((c) => (
            <section key={c}>
              <h2 className="mb-3 text-base font-semibold text-zinc-700">{c}</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tools
                  .filter((t) => t.category === c)
                  .map((t) => (
                    <li key={t.id} className="rounded border border-zinc-200 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium">{t.name}</h3>
                          <p className="text-sm text-zinc-600">{t.description}</p>
                        </div>
                        <Link href={`/tools/${t.id}`} className="rounded bg-zinc-900 px-3 py-1.5 text-white">打开</Link>
                      </div>
                      <div className="mt-3 text-xs text-zinc-500">{t.tags.join(" · ")}</div>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((t) => (
            <li key={t.id} className="rounded border border-zinc-200 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-medium">{t.name}</h2>
                  <p className="text-sm text-zinc-600">{t.description}</p>
                </div>
                <Link href={`/tools/${t.id}`} className="rounded bg-zinc-900 px-3 py-1.5 text-white">打开</Link>
              </div>
              <div className="mt-3 text-xs text-zinc-500">{t.tags.join(" · ")}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
