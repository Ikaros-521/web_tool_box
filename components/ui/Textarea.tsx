"use client"
type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>
export default function Textarea(props: Props) {
  const { className = "", ...rest } = props
  return <textarea {...rest} className={`min-h-[260px] w-full rounded border border-zinc-300 bg-white p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-zinc-400 ${className}`} />
}

