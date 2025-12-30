import React from 'react'
import { Button } from '../ui/button'
import { FileText, Inbox, Pencil, Send, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { NavItem } from '../Elements/NavItem'

type SideBarProps = {
  setComposeOpen: React.Dispatch<React.SetStateAction<boolean>>
  active?: 'inbox' | 'sent' | 'drafts' | 'trash'
}

export default function SideBar({
  setComposeOpen,
  active = 'sent'
}: SideBarProps) {
  return (
    <aside className="md:sticky md:top-20 md:h-[calc(100vh-5rem)]">
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
            active={active === 'inbox'}
          />
          <NavItem
            icon={<Send className="h-4 w-4" />}
            label="Sent"
            href="/sent"
            active={active === 'sent'}
          />
          <NavItem
            icon={<FileText className="h-4 w-4" />}
            label="Drafts"
            href="/drafts"
            active={active === 'drafts'}
          />
          <NavItem
            icon={<Trash2 className="h-4 w-4" />}
            label="Trash"
            href="/trash"
            active={active === 'trash'}
          />
        </div>
      </div>
    </aside>
  )
}
