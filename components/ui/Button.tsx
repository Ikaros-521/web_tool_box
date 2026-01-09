"use client"
type Props = {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  variant?: "primary" | "secondary" | "success" | "ghost"
  size?: "sm" | "md"
}
export default function Button({ children, onClick, disabled, className = "", variant = "primary", size = "md" }: Props) {
  const base = "inline-flex items-center justify-center rounded transition-colors"
  const sizes = size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2 text-sm"
  const variants = {
    primary: "bg-zinc-900 text-white hover:bg-zinc-700 disabled:opacity-50",
    secondary: "bg-white text-zinc-800 border border-zinc-300 hover:bg-zinc-100",
    success: "bg-green-600 text-white hover:bg-green-700",
    ghost: "bg-transparent text-zinc-800 hover:bg-zinc-100",
  }[variant]
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${sizes} ${variants} ${className}`}>{children}</button>
  )
}

