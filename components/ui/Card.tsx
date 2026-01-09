type Props = { children: React.ReactNode; className?: string }
export default function Card({ children, className = "" }: Props) {
  return <div className={`rounded border border-zinc-200 bg-white/70 shadow-sm ${className}`}>{children}</div>
}

