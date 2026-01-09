"use client"
type Props = React.SelectHTMLAttributes<HTMLSelectElement>
export default function Select(props: Props) {
  const { className = "", ...rest } = props
  return <select {...rest} className={`rounded border border-zinc-300 bg-white px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-zinc-400 ${className}`} />
}

