"use client"
import { useMemo, useState } from "react"

export default function JsonFormatter() {
  const [input, setInput] = useState("{\n  \"hello\": \"world\"\n}")
  const [indent, setIndent] = useState(2)

  const { formatted, error } = useMemo(() => {
    try {
      const obj = JSON.parse(input)
      return { formatted: JSON.stringify(obj, null, indent), error: "" }
    } catch (e: any) {
      return { formatted: "", error: e?.message || "解析失败" }
    }
  }, [input, indent])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">JSON 格式化/校验</h2>
        <div className="flex items-center gap-2">
          <label className="text-sm text-zinc-600">缩进</label>
          <input
            type="number"
            min={0}
            max={8}
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value) || 0)}
            className="w-16 rounded border border-zinc-300 px-2 py-1 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="粘贴或输入 JSON 文本"
          className="min-h-[260px] w-full rounded border border-zinc-300 bg-white p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-zinc-400"
        />

        <div className="min-h-[260px] w-full rounded border border-zinc-200 bg-zinc-50 p-3">
          {error ? (
            <div className="text-red-600 text-sm">错误：{error}</div>
          ) : (
            <pre className="whitespace-pre-wrap break-words text-sm">{formatted}</pre>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => navigator.clipboard.writeText(formatted || "")}
          disabled={!!error || !formatted}
          className="rounded bg-zinc-900 px-3 py-2 text-white disabled:opacity-50"
        >
          复制结果
        </button>
        <button
          onClick={() => setInput("{\n  \"hello\": \"world\"\n}")}
          className="rounded border border-zinc-300 bg-white px-3 py-2"
        >
          重置示例
        </button>
      </div>
    </div>
  )
}

