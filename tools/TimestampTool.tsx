"use client"
import { useEffect, useMemo, useRef, useState } from "react"
import Card from "../components/ui/Card"
import SectionHeader from "../components/ui/SectionHeader"
import Input from "../components/ui/Input"
import Select from "../components/ui/Select"
import Button from "../components/ui/Button"

type Unit = "auto" | "sec" | "ms"

const COMMON_TIMEZONES = [
  { label: "系统时区", value: "local" },
  { label: "UTC", value: "UTC" },
  { label: "Asia/Shanghai", value: "Asia/Shanghai" },
  { label: "Europe/London", value: "Europe/London" },
  { label: "America/New_York", value: "America/New_York" },
  { label: "Asia/Tokyo", value: "Asia/Tokyo" },
]

function resolveTZ(tz: string, custom: string) {
  if (custom.trim()) return custom.trim()
  if (tz === "local") {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"
    } catch {
      return "UTC"
    }
  }
  return tz
}

function formatInTZ(date: Date, tz: string) {
  const parts = new Intl.DateTimeFormat("zh-CN", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date)
  const get = (type: string) => parts.find((p) => p.type === type)?.value || ""
  return `${get("year")}-${get("month")}-${get("day")} ${get("hour")}:${get("minute")}:${get("second")}`
}

function detectUnit(s: string): Unit {
  const t = s.trim()
  if (!t) return "auto"
  if (/^\d+$/.test(t)) {
    return t.length <= 10 ? "sec" : "ms"
  }
  return "auto"
}

function toMillis(value: string, unit: Unit): number | null {
  const t = value.trim()
  if (!t) return null
  if (!/^\d+$/.test(t)) return null
  const n = Number(t)
  const u = unit === "auto" ? detectUnit(t) : unit
  return u === "sec" ? n * 1000 : n
}

function addDaysMs(ms: number, days: number) {
  return ms + days * 24 * 60 * 60 * 1000
}
function addWeeksMs(ms: number, weeks: number) {
  return addDaysMs(ms, weeks * 7)
}
function addMonthsMs(ms: number, months: number) {
  const d = new Date(ms)
  d.setMonth(d.getMonth() + months)
  return d.getTime()
}

export default function TimestampTool() {
  const [tzSel, setTzSel] = useState<string>("Asia/Shanghai")
  const [tzCustom, setTzCustom] = useState<string>("")
  const tz = resolveTZ(tzSel, tzCustom)

  const [nowMs, setNowMs] = useState<number>(Date.now())
  const timerRef = useRef<number | null>(null)
  useEffect(() => {
    timerRef.current = window.setInterval(() => setNowMs(Date.now()), 1000)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [])

  const [inputTs, setInputTs] = useState<string>("")
  const [unit, setUnit] = useState<Unit>("auto")

  const currentStr = useMemo(() => formatInTZ(new Date(nowMs), tz), [nowMs, tz])
  const currentSec = useMemo(() => Math.floor(nowMs / 1000), [nowMs])

  const inputMs = useMemo(() => toMillis(inputTs, unit), [inputTs, unit])
  const inputStr = useMemo(() => (inputMs != null ? formatInTZ(new Date(inputMs), tz) : ""), [inputMs, tz])

  const bump = (fn: (ms: number) => number) => {
    const base = inputMs != null ? inputMs : nowMs
    const next = fn(base)
    setInputTs(String(Math.floor(unit === "sec" ? next / 1000 : next)))
  }

  const [daysN, setDaysN] = useState<string>("1")
  const daysVal = Number(daysN) || 0

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader title="时间戳转换" subtitle="秒/毫秒、时间与时区转换，支持加减日期" />
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm">
          时区
          <Select value={tzSel} onChange={(e) => setTzSel(e.target.value)}>
            {COMMON_TIMEZONES.map((z) => (
              <option key={z.value} value={z.value}>{z.label}</option>
            ))}
          </Select>
        </label>
        <Input value={tzCustom} onChange={(e) => setTzCustom(e.target.value)} placeholder="自定义 IANA 时区（可留空）" className="w-64" />
      </div>

      <section className="space-y-3">
        <h3 className="text-base font-semibold">当前时间</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-3">
            <div className="flex items-center justify-between">
              <div className="text-sm">当前时间（{tz}）</div>
              <Button size="sm" variant="secondary" onClick={() => navigator.clipboard.writeText(currentStr)}>复制</Button>
            </div>
            <div className="mt-2 rounded border border-zinc-300 bg-white p-2">{currentStr}</div>
          </Card>
          <Card className="p-3">
            <div className="flex items-center justify-between">
              <div className="text-sm">当前时间戳（秒）</div>
              <Button size="sm" variant="secondary" onClick={() => navigator.clipboard.writeText(String(currentSec))}>复制</Button>
            </div>
            <div className="mt-2 rounded border border-zinc-300 bg-white p-2">{currentSec}</div>
          </Card>
          <Card className="p-3">
            <div className="flex items-center justify-between">
              <div className="text-sm">当前时间戳（毫秒）</div>
              <Button size="sm" variant="secondary" onClick={() => navigator.clipboard.writeText(String(nowMs))}>复制</Button>
            </div>
            <div className="mt-2 rounded border border-zinc-300 bg-white p-2">{nowMs}</div>
          </Card>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-base font-semibold">时间转换</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-3">
            <label className="text-sm">时间戳</label>
            <Input value={inputTs} onInput={(e) => setInputTs((e.target as HTMLInputElement).value)} placeholder="输入秒或毫秒" className="mt-2" />
            <div className="mt-2 flex items-center gap-2 text-sm">
              单位
              <Select value={unit} onChange={(e) => setUnit(e.target.value as Unit)}>
                <option value="auto">自动</option>
                <option value="sec">秒</option>
                <option value="ms">毫秒</option>
              </Select>
              <Button size="sm" onClick={() => setInputTs(String(currentSec))}>写入当前秒</Button>
              <Button size="sm" onClick={() => setInputTs(String(nowMs))}>写入当前毫秒</Button>
              <Button size="sm" variant="secondary" onClick={() => setInputTs("")}>清空</Button>
            </div>
          </Card>
          <Card className="p-3">
            <div className="flex items-center justify-between">
              <div className="text-sm">转换结果（{tz}）</div>
              <Button size="sm" variant="secondary" onClick={() => inputStr && navigator.clipboard.writeText(inputStr)} disabled={!inputStr}>复制</Button>
            </div>
            <div className="mt-2 rounded border border-zinc-300 bg-white p-2 min-h-10">{inputStr || ""}</div>
          </Card>
        </div>

        <div className="sticky top-2 z-10 bg-white/80 backdrop-blur rounded border border-zinc-200 p-2 flex flex-wrap gap-2">
          <Button variant="success" onClick={() => bump((ms) => ms)}>转换为时间</Button>
          <Button variant="success" onClick={() => bump((ms) => addDaysMs(ms, 1))}>+ 加1天</Button>
          <Button variant="success" onClick={() => bump((ms) => addDaysMs(ms, 3))}>+ 加3天</Button>
          <Button variant="success" onClick={() => bump((ms) => addWeeksMs(ms, 1))}>+ 加1周</Button>
          <Button variant="success" onClick={() => bump((ms) => addMonthsMs(ms, 1))}>+ 加1月</Button>
          <Button variant="success" onClick={() => bump((ms) => addDaysMs(ms, 365))}>+ 加365天</Button>
          <Button variant="success" onClick={() => bump((ms) => addDaysMs(ms, -1))}>- 减1天</Button>
          <Button variant="success" onClick={() => bump((ms) => addDaysMs(ms, -3))}>- 减3天</Button>
          <Button variant="success" onClick={() => bump((ms) => addMonthsMs(ms, -1))}>- 减1月</Button>
        </div>

        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
          <div className="md:col-span-2">
            <label className="text-sm">输入天数</label>
            <Input value={daysN} onInput={(e) => setDaysN((e.target as HTMLInputElement).value)} placeholder="如：10" className="mt-2" />
          </div>
          <div className="flex gap-2">
            <Button variant="success" onClick={() => bump((ms) => addDaysMs(ms, Math.abs(daysVal)))}>+ 加天数</Button>
            <Button variant="success" onClick={() => bump((ms) => addDaysMs(ms, -Math.abs(daysVal)))}>- 减天数</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
