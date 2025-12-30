import Link from "next/link"

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function NavItem({
  icon,
  label,
  href,
  active
}: {
  icon: React.ReactNode
  label: string
  href: string
  active?: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(
        'flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm transition',
        active
          ? 'bg-[#e8f0fe] text-slate-900 dark:bg-white/10 dark:text-white'
          : 'text-slate-700 hover:bg-[#f2f6ff] dark:text-slate-200 dark:hover:bg-white/5'
      )}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  )
}