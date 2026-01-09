export type ToolDescriptor = {
  id: string
  name: string
  description: string
  tags: string[]
  category: string
  import: () => Promise<{ default: React.ComponentType<any> }>
}

export const tools: ToolDescriptor[] = [
  {
    id: "json-formatter",
    name: "JSON 格式化",
    description: "格式化/校验 JSON 文本",
    tags: ["json", "格式化"],
    category: "数据格式",
    import: () => import("../tools/JsonFormatter"),
  },
  {
    id: "srt-to-txt",
    name: "SRT 转 TXT",
    description: "去除序号与时间戳，仅保留字幕文本",
    tags: ["srt", "字幕", "文本", "转换"],
    category: "文本处理",
    import: () => import("../tools/SrtToTxt"),
  },
  {
    id: "timestamp",
    name: "时间戳转换",
    description: "秒/毫秒、时间与时区转换，支持加减日期",
    tags: ["时间", "时间戳", "时区", "日期"],
    category: "时间工具",
    import: () => import("../tools/TimestampTool"),
  },
]

