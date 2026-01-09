type Props = { title: string; subtitle?: string }
export default function SectionHeader({ title, subtitle }: Props) {
  return (
    <header className="mb-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {subtitle ? <p className="text-sm text-zinc-600">{subtitle}</p> : null}
    </header>
  )
}

