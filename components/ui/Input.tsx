"use client"
type Props = React.InputHTMLAttributes<HTMLInputElement>
export default function Input(props: Props) {
  const { className = "", ...rest } = props
  return <input {...rest} className={`w-full rounded border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-400 ${className}`} />
}

