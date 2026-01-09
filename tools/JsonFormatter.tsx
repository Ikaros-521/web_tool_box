"use client"
import { useMemo, useState } from "react"
import Card from "../components/ui/Card"
import SectionHeader from "../components/ui/SectionHeader"
import Textarea from "../components/ui/Textarea"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"

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
    <div className="flex flex-col gap-6">
      <SectionHeader title="JSON 格式化/校验" />
      <div className="flex items-center gap-3">
        <span className="text-sm text-zinc-600">缩进</span>
        <Input type="number" min={0} max={8} value={indent} onChange={(e) => setIndent(Number(e.target.value) || 0)} className="w-20" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <Textarea value={input} onInput={(e) => setInput((e.target as HTMLTextAreaElement).value)} placeholder="粘贴或输入 JSON 文本" />
        </Card>
        <Card>
          <div className="min-h-[260px] w-full p-3">
            {error ? (
              <div className="text-red-600 text-sm">错误：{error}</div>
            ) : (
              <pre className="whitespace-pre-wrap break-words text-sm">{formatted}</pre>
            )}
          </div>
        </Card>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => navigator.clipboard.writeText(formatted || "")} disabled={!!error || !formatted}>复制结果</Button>
        <Button variant="secondary" onClick={() => setInput("{\n  \"hello\": \"world\"\n}")}>重置示例</Button>
      </div>
    </div>
  )
}

