'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import { CalendarClock, FileText, Inbox, Pencil, Send, Trash2 } from 'lucide-react'
import { NavItem } from '../Elements/NavItem'

type SideBarProps = {
  setComposeOpen: React.Dispatch<React.SetStateAction<boolean>>
  active?: 'inbox' | 'sent' | 'drafts' | 'scheduled' | 'trash'
}

export default function SideBar({
  setComposeOpen,
  active
}: SideBarProps) {
  const pathname = usePathname()

  // If 'active' prop is not provided, derive it from pathname
  const currentActive = active ?? (
    pathname.includes('/sent') ? 'sent' :
    pathname.includes('/drafts') ? 'drafts' :
    pathname.includes('/scheduled') ? 'scheduled' :
    pathname.includes('/trash') ? 'trash' :
    'inbox'
  )

  return (
    <aside className="pt-5">
      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-white/5">
        <Button
          onClick={() => setComposeOpen(true)}
          className="h-11 w-full justify-start gap-2 rounded-full"
        >
          <Pencil className="h-4 w-4" />
          Compose
        </Button>

        <div className="hidden md:block mt-3 space-y-1">
          <NavItem
            icon={<Inbox className="h-4 w-4" />}
            label="Inbox"
            href="/inbox"
            active={currentActive === 'inbox'}
          />
          <NavItem
            icon={<Send className="h-4 w-4" />}
            label="Sent"
            href="/sent"
            active={currentActive === 'sent'}
          />
          <NavItem
            icon={<FileText className="h-4 w-4" />}
            label="Drafts"
            href="/drafts"
            active={currentActive === 'drafts'}
          />
          <NavItem
            icon={<CalendarClock className="h-4 w-4" />}
            label="Scheduled"
            href="/scheduled"
            active={currentActive === 'scheduled'}
          />
          <NavItem
            icon={<Trash2 className="h-4 w-4" />}
            label="Trash"
            href="/trash"
            active={currentActive === 'trash'}
          />
        </div>
      </div>
    </aside>
  )
}
