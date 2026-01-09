"use client"
import { useMemo, useState } from "react"
import Card from "../components/ui/Card"
import SectionHeader from "../components/ui/SectionHeader"
import Textarea from "../components/ui/Textarea"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"

function srtToText(src: string, joinBlockLines: boolean, stripTags: boolean) {
  const lines = src.replace(/\r\n?/g, "\n").split("\n")
  const out: string[] = []
  let buf: string[] = []
  const isIndex = (s: string) => /^\d+$/.test(s.trim())
  const isTime = (s: string) => /-->/.test(s)
  const clean = (s: string) => {
    let x = s
    if (stripTags) x = x.replace(/<[^>]+>/g, "")
    return x.trim()
  }
  const flush = () => {
    if (buf.length === 0) return
    const content = joinBlockLines ? buf.join(" ") : buf.join("\n")
    if (content.trim()) out.push(content.trim())
    buf = []
  }
  for (const line of lines) {
    if (line.trim() === "") {
      flush()
      continue
    }
    if (isIndex(line) || isTime(line)) continue
    const t = clean(line)
    if (t) buf.push(t)
  }
  flush()
  return out.join("\n\n")
}

export default function SrtToTxt() {
  const [input, setInput] = useState("1\n00:00:00,000 --> 00:00:02,000\nHello, world!\n\n2\n00:00:02,500 --> 00:00:04,000\nThis is a demo.\n")
  const [joinBlockLines, setJoinBlockLines] = useState(false)
  const [stripTags, setStripTags] = useState(true)

  const result = useMemo(() => srtToText(input, joinBlockLines, stripTags), [input, joinBlockLines, stripTags])

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader title="SRT 转 TXT" />
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={joinBlockLines} onChange={(e) => setJoinBlockLines(e.target.checked)} />
          合并同块行
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={stripTags} onChange={(e) => setStripTags(e.target.checked)} />
          移除格式标签
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <Textarea value={input} onInput={(e) => setInput((e.target as HTMLTextAreaElement).value)} placeholder="粘贴 SRT 字幕内容" />
        </Card>
        <Card>
          <pre className="min-h-[260px] whitespace-pre-wrap break-words text-sm p-3">{result}</pre>
        </Card>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => navigator.clipboard.writeText(result)}>复制结果</Button>
        <Button variant="secondary"
          onClick={() => {
            const blob = new Blob([result], { type: "text/plain;charset=utf-8" })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = "subtitle.txt"
            document.body.appendChild(a)
            a.click()
            a.remove()
            URL.revokeObjectURL(url)
          }}
        >
          下载 TXT
        </Button>
      </div>
    </div>
  )
}

